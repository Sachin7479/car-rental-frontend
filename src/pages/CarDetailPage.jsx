import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CARS } from './HomePage';
import {
    createBooking,
    getId,
    getRole,
    getVariantById,
    isLoggedIn,
    logout,
} from '../services/authService';

const ORANGE = '#FF6B00';
const ORANGE_LIGHT = '#FF8C38';
const DARK = '#1a1a2e';
const WHITE = '#ffffff';

const DEFAULT_CAR = {
    id: 1,
    name: 'Toyota Fortuner',
    company: 'Toyota',
    modelNumber: 'Fortuner',
    fuelType: 'Diesel',
    seatCapacity: 7,
    year: 2023,
    isAc: true,
    rentPerDay: 3500,
    description: 'The Toyota Fortuner is a legendary off-road SUV that combines rugged capability with modern comfort. Perfect for adventure trips and city drives alike.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    features: ['4x4 Drive', 'Sunroof', 'Touchscreen', 'Rear Camera', 'ABS', 'Airbags'],
};

export default function CarDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [booked, setBooked] = useState(false);
    const [car, setCar] = useState(DEFAULT_CAR);
    const [loadingCar, setLoadingCar] = useState(true);
    const isCustomerLoggedIn = isLoggedIn() && getRole() === 'CUSTOMER';

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        let ignore = false;

        const loadVariant = async() => {
            setLoadingCar(true);

            try {
                const response = await getVariantById(id);
                if (ignore) {
                    return;
                }

                const nextCar = {
                    ...DEFAULT_CAR,
                    ...response,
                    seatCapacity: response.seatCapacity ?? DEFAULT_CAR.seatCapacity,
                    isAc: response.isAc ?? DEFAULT_CAR.isAc,
                    rentPerDay: Number(response.rentPerDay ?? DEFAULT_CAR.rentPerDay),
                    features: [
                        response.fuelType || 'Premium Build',
                        `${response.seatCapacity ?? DEFAULT_CAR.seatCapacity} Seats`,
                        response.isAc ? 'Air Conditioning' : 'Non AC',
                        response.company || 'Trusted Brand',
                        response.modelNumber || 'Latest Model',
                        response.year ? `Model ${response.year}` : 'Road Ready',
                    ],
                };
                setCar(nextCar);
            } catch (err) {
                if (!ignore) {
                    const errMsg = err.response?.data?.message || 'Unable to load this car right now.';
                    if (errMsg === 'Variant not found!') {
                        const fallbackCar = CARS.find(c => c.id === Number(id));
                        if (fallbackCar) {
                            setCar({
                                ...DEFAULT_CAR,
                                id: fallbackCar.id,
                                name: fallbackCar.name,
                                company: fallbackCar.company,
                                fuelType: fallbackCar.fuel,
                                seatCapacity: fallbackCar.seats,
                                rentPerDay: fallbackCar.price,
                                image: fallbackCar.img,
                                features: [
                                    fallbackCar.fuel,
                                    `${fallbackCar.seats} Seats`,
                                    'Air Conditioning',
                                    fallbackCar.company,
                                    'Latest Model',
                                    'Road Ready'
                                ]
                            });
                            setError('');
                        } else {
                            setError(errMsg);
                        }
                    } else {
                        setError(errMsg);
                    }
                }
            } finally {
                if (!ignore) {
                    setLoadingCar(false);
                }
            }
        };

        loadVariant();

        return () => {
            ignore = true;
        };
    }, [id]);

    // Calculate total days and price when dates change
    useEffect(() => {
        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
            if (diff > 0) {
                setTotalDays(diff);
                setTotalPrice(diff * Number(car.rentPerDay || 0));
                setError('');
            } else {
                setTotalDays(0);
                setTotalPrice(0);
                setError('To date must be after From date!');
            }
        }
    }, [fromDate, toDate, car.rentPerDay]);

    const handleBooking = async(e) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!isCustomerLoggedIn) {
            setError('Please login as customer to request this booking.');
            return;
        }
        if (!fromDate) { setError('Please select From date!'); return; }
        if (!toDate) { setError('Please select To date!'); return; }
        if (totalDays <= 0) { setError('Please select valid dates!'); return; }
        setError('');
        setSuccess('');
        setBooked(true);

        try {
            const response = await createBooking({
                customerId: Number(getId()),
                variantId: Number(id),
                carName: car.name,
                carImage: car.image,
                fromDate,
                toDate,
                totalDays,
                totalPrice,
            });

            if (!response.success) {
                setError(response.message || 'Booking failed!');
                setBooked(false);
                return;
            }

            setSuccess(response.message || 'Booking initiated successfully! Your request is pending admin approval.');
            setTimeout(() => {
                navigate('/customer/bookings');
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to submit booking right now. Please check your backend connection.'
            );
            setBooked(false);
        }
    };

    // Get today's date for min date
    const today = new Date().toISOString().split('T')[0];

    return ( <
        div style = {
            {
                minHeight: '100vh',
                fontFamily: "'Rajdhani', sans-serif",
                background: '#f4f6fb',
            }
        } >

        { /* ── NAVBAR ── */ } <
        nav style = {
            {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                height: '70px',
                background: 'rgba(26,26,46,0.97)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,107,0,0.2)',
            }
        } >
        <
        div onClick = {
            () => navigate('/') }
        style = {
            { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' } } >
        <
        span style = {
            { fontSize: '26px' } } > 🚗 < /span> <
        span style = {
            {
                fontSize: '22px',
                fontWeight: '800',
                color: WHITE,
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: '1px',
            }
        } >
        Car < span style = {
            { color: ORANGE } } > Rental < /span> <
        /span> <
        /div> <
        div style = {
            { display: 'flex', gap: '20px', alignItems: 'center' } } >
        <
        span onClick = {
            () => navigate('/') }
        style = {
            { color: '#ccc', cursor: 'pointer', fontSize: '15px', fontWeight: '600' } } >
        Home <
        /span> {
            isCustomerLoggedIn ? ( <
                >
                <
                span onClick = {
                    () => navigate('/customer/bookings') }
                style = {
                    { color: '#ccc', cursor: 'pointer', fontSize: '15px', fontWeight: '600' } } >
                My Bookings <
                /span> <
                span onClick = {
                    () => navigate('/customer/profile') }
                style = {
                    {
                        color: WHITE,
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '700',
                        background: ORANGE,
                        padding: '8px 22px',
                        borderRadius: '25px',
                    }
                } >
                My Profile <
                /span> <
                span onClick = {
                    () => { logout();
                        navigate('/login'); } }
                style = {
                    { color: '#ccc', cursor: 'pointer', fontSize: '15px', fontWeight: '700' } } >
                Logout <
                /span> <
                />
            ) : ( <
                >
                <
                span onClick = {
                    () => navigate('/login') }
                style = {
                    { color: ORANGE, cursor: 'pointer', fontSize: '15px', fontWeight: '700' } } >
                Login <
                /span> <
                span onClick = {
                    () => navigate('/register') }
                style = {
                    {
                        color: WHITE,
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '700',
                        background: ORANGE,
                        padding: '8px 22px',
                        borderRadius: '25px',
                    }
                } >
                Register <
                /span> <
                />
            )
        } <
        /div> <
        /nav>

        { /* ── HERO BANNER ── */ } <
        div style = {
            {
                position: 'relative',
                height: '320px',
                marginTop: '70px',
                overflow: 'hidden',
            }
        } >
        <
        div style = {
            {
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 60%',
                filter: 'brightness(0.4)',
            }
        }
        /> <
        div style = {
            {
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(255,107,0,0.15) 100%)',
            }
        }
        /> <
        div style = {
            {
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }
        } > { /* breadcrumb */ } <
        div style = {
            {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
            }
        } >
        <
        span onClick = {
            () => navigate('/') }
        style = {
            { color: 'rgba(255,255,255,0.6)', fontSize: '14px', cursor: 'pointer', fontWeight: '600' } } >
        Home <
        /span> <
        span style = {
            { color: ORANGE, fontSize: '14px' } } > › < /span> <
        span style = {
            { color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '600' } } > Cars < /span> <
        span style = {
            { color: ORANGE, fontSize: '14px' } } > › < /span> <
        span style = {
            { color: WHITE, fontSize: '14px', fontWeight: '700' } } > { car.name } < /span> <
        /div> <
        h1 style = {
            {
                fontSize: '52px',
                fontWeight: '900',
                color: WHITE,
                letterSpacing: '-1px',
                marginBottom: '8px',
            }
        } > { loadingCar ? 'Loading car...' : car.name } <
        /h1> <
        p style = {
            {
                fontSize: '18px',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '600',
            }
        } > { car.company }• { car.modelNumber }• { car.year } <
        /p> <
        /div> <
        /div>

        { /* ── MAIN CONTENT ── */ } <
        div style = {
            {
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 24px 60px',
                display: 'grid',
                gridTemplateColumns: '1fr 380px',
                gap: '28px',
                alignItems: 'start',
            }
        } >

        { /* ── LEFT COLUMN ── */ } <
        div >

        { /* Car Image Card */ } <
        div style = {
            {
                background: WHITE,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '24px',
            }
        } >
        <
        div style = {
            { position: 'relative', height: '380px', overflow: 'hidden' } } >
        <
        img src = { car.image }
        alt = { car.name }
        style = {
            {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s',
            }
        }
        onMouseEnter = { e => e.target.style.transform = 'scale(1.04)' }
        onMouseLeave = { e => e.target.style.transform = 'scale(1)' }
        onError = {
            e => {
                e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80';
            }
        }
        /> { /* AC badge */ } {
            car.isAc && ( <
                div style = {
                    {
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(26,26,46,0.85)',
                        color: WHITE,
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '700',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,107,0,0.3)',
                    }
                } > ❄️AC Available <
                /div>
            )
        } <
        div style = {
            {
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: ORANGE,
                color: WHITE,
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '700',
            }
        } > ✅Available <
        /div> <
        /div> <
        /div>

        { /* Car Specs */ } <
        div style = {
            {
                background: WHITE,
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '24px',
            }
        } >
        <
        h2 style = {
            {
                fontSize: '22px',
                fontWeight: '900',
                color: DARK,
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #f0f0f0',
            }
        } > 🔧Car Specifications <
        /h2> <
        div style = {
            {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
            }
        } > {
            [
                { icon: '⛽', label: 'Fuel Type', value: car.fuelType },
                { icon: '💺', label: 'Seat Capacity', value: `${car.seatCapacity} Seats` },
                { icon: '🏢', label: 'Company', value: car.company },
                { icon: '🔢', label: 'Model Number', value: car.modelNumber },
                { icon: '📅', label: 'Year', value: car.year },
                { icon: '❄️', label: 'AC', value: car.isAc ? 'Yes' : 'No' },
            ].map((spec, i) => ( <
                div key = { i }
                style = {
                    {
                        background: '#f8f9ff',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #eef0f8',
                        transition: 'transform 0.2s',
                    }
                }
                onMouseEnter = { e => e.currentTarget.style.transform = 'translateY(-3px)' }
                onMouseLeave = { e => e.currentTarget.style.transform = 'translateY(0)' } >
                <
                div style = {
                    { fontSize: '24px', marginBottom: '6px' } } > { spec.icon } < /div> <
                div style = {
                    {
                        fontSize: '12px',
                        color: '#999',
                        fontWeight: '600',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }
                } > { spec.label } <
                /div> <
                div style = {
                    {
                        fontSize: '16px',
                        fontWeight: '800',
                        color: DARK,
                    }
                } > { spec.value } <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div>

        { /* Description */ } <
        div style = {
            {
                background: WHITE,
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '24px',
            }
        } >
        <
        h2 style = {
            {
                fontSize: '22px',
                fontWeight: '900',
                color: DARK,
                marginBottom: '14px',
            }
        } > 📝Description <
        /h2> <
        p style = {
            {
                fontSize: '16px',
                color: '#555',
                lineHeight: '1.8',
                fontWeight: '500',
            }
        } > { car.description } <
        /p> <
        /div>

        { /* Features */ } <
        div style = {
            {
                background: WHITE,
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }
        } >
        <
        h2 style = {
            {
                fontSize: '22px',
                fontWeight: '900',
                color: DARK,
                marginBottom: '16px',
            }
        } > ⭐Key Features <
        /h2> <
        div style = {
            {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }
        } > {
            car.features.map((f, i) => ( <
                div key = { i }
                style = {
                    {
                        background: 'rgba(255,107,0,0.08)',
                        border: `1px solid rgba(255,107,0,0.2)`,
                        color: ORANGE,
                        padding: '8px 18px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '700',
                    }
                } > ✓{ f } <
                /div>
            ))
        } <
        /div> <
        /div> <
        /div>

        { /* ── RIGHT COLUMN — BOOKING CARD ── */ } <
        div style = {
            { position: 'sticky', top: '90px' } } >

        { /* Price Card */ } <
        div style = {
            {
                background: WHITE,
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                marginBottom: '20px',
                border: `2px solid rgba(255,107,0,0.15)`,
            }
        } >
        <
        div style = {
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
            }
        } >
        <
        span style = {
            {
                fontSize: '36px',
                fontWeight: '900',
                color: ORANGE,
            }
        } > ₹{ Number(car.rentPerDay || 0).toLocaleString() } <
        /span> <
        span style = {
            {
                fontSize: '14px',
                color: '#999',
                fontWeight: '600',
            }
        } >
        per day <
        /span> <
        /div> <
        div style = {
            {
                fontSize: '13px',
                color: '#aaa',
                fontWeight: '600',
                paddingBottom: '20px',
                borderBottom: '2px solid #f0f0f0',
                marginBottom: '20px',
            }
        } >
        All taxes included <
        /div>

        { /* error */ } {
            error && ( <
                div style = {
                    {
                        background: '#fff0f0',
                        border: '1px solid #ffcccc',
                        color: '#cc0000',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }
                } > ⚠️{ error } <
                /div>
            )
        }

        { /* From Date */ } <
        label style = {
            {
                display: 'block',
                fontSize: '13px',
                fontWeight: '700',
                color: ORANGE,
                marginBottom: '6px',
                letterSpacing: '0.5px',
            }
        } >
        FROM DATE <
        /label> <
        input type = "date"
        min = { today }
        value = { fromDate }
        onChange = { e => setFromDate(e.target.value) }
        style = {
            {
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                fontSize: '15px',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: '600',
                color: DARK,
                background: '#fafafa',
                outline: 'none',
                marginBottom: '14px',
                boxSizing: 'border-box',
            }
        }
        onFocus = { e => e.target.style.borderColor = ORANGE }
        onBlur = { e => e.target.style.borderColor = '#e0e0e0' }
        />

        { /* To Date */ } <
        label style = {
            {
                display: 'block',
                fontSize: '13px',
                fontWeight: '700',
                color: ORANGE,
                marginBottom: '6px',
                letterSpacing: '0.5px',
            }
        } >
        TO DATE <
        /label> <
        input type = "date"
        min = { fromDate || today }
        value = { toDate }
        onChange = { e => setToDate(e.target.value) }
        style = {
            {
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                fontSize: '15px',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: '600',
                color: DARK,
                background: '#fafafa',
                outline: 'none',
                marginBottom: '20px',
                boxSizing: 'border-box',
            }
        }
        onFocus = { e => e.target.style.borderColor = ORANGE }
        onBlur = { e => e.target.style.borderColor = '#e0e0e0' }
        />

        { /* Price Summary */ } {
            totalDays > 0 && ( <
                div style = {
                    {
                        background: 'rgba(255,107,0,0.06)',
                        border: '1px solid rgba(255,107,0,0.15)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '20px',
                    }
                } >
                <
                div style = {
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                    }
                } >
                <
                span style = {
                    { fontSize: '14px', color: '#666', fontWeight: '600' } } > ₹{ Number(car.rentPerDay || 0).toLocaleString() }× { totalDays }
                days <
                /span> <
                span style = {
                    { fontSize: '14px', color: DARK, fontWeight: '700' } } > ₹{ totalPrice.toLocaleString() } <
                /span> <
                /div> <
                div style = {
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255,107,0,0.15)',
                    }
                } >
                <
                span style = {
                    { fontSize: '16px', fontWeight: '800', color: DARK } } >
                Total Amount <
                /span> <
                span style = {
                    { fontSize: '20px', fontWeight: '900', color: ORANGE } } > ₹{ totalPrice.toLocaleString() } <
                /span> <
                /div> <
                /div>
            )
        }

        { /* success */ } {
            success && ( <
                div style = {
                    {
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        color: '#16a34a',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        marginBottom: '16px',
                    }
                } > ✅{ success } <
                /div>
            )
        }

        { /* Book Button */ } <
        button type = "button"
        onClick = { handleBooking }
        style = {
            {
                width: '100%',
                background: booked ?
                    '#ccc' :
                    `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%)`,
                color: WHITE,
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '900',
                fontFamily: "'Rajdhani', sans-serif",
                cursor: booked ? 'not-allowed' : 'pointer',
                letterSpacing: '1px',
                boxShadow: booked ? 'none' : '0 8px 25px rgba(255,107,0,0.4)',
                transition: 'transform 0.2s',
            }
        }
        onMouseEnter = {
            e => {
                if (!booked) e.target.style.transform = 'translateY(-2px)';
            }
        }
        onMouseLeave = { e => e.target.style.transform = 'translateY(0)' } >
        { booked ? '⏳ Booking...' : isCustomerLoggedIn ? '🚗 BOOK CAR NOW' : '🔐 LOGIN TO BOOK' } <
        /button>

        <
        p style = {
            {
                textAlign: 'center',
                fontSize: '12px',
                color: '#aaa',
                marginTop: '12px',
                fontWeight: '600',
            }
        } > 🔐Secure booking• No hidden charges <
        /p> <
        /div>

        { /* Help Card */ } <
        div style = {
            {
                background: DARK,
                borderRadius: '16px',
                padding: '22px',
                border: `1px solid rgba(255,107,0,0.2)`,
            }
        } >
        <
        div style = {
            {
                fontSize: '16px',
                fontWeight: '800',
                color: WHITE,
                marginBottom: '8px',
            }
        } > 📞Need Help ?
        <
        /div> <
        p style = {
            {
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: '1.6',
                marginBottom: '14px',
            }
        } >
        Our support team is available 24 / 7 to assist you with your booking. <
        /p> <
        div style = {
            {
                background: ORANGE,
                color: WHITE,
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                cursor: 'pointer',
            }
        } > 📱Contact Support <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>
    );
}