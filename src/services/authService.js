import axios from 'axios';

const BASE_URL = 'https://car-rental-services-2.onrender.com/api';

export const saveToken = (token, role, name, id, email, profile = {}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name || '');
    localStorage.setItem('id', String(id || ''));
    localStorage.setItem('email', email || '');
    localStorage.setItem('firstname', profile.firstname || '');
    localStorage.setItem('lastname', profile.lastname || '');
    localStorage.setItem('contact', profile.contact || '');
    localStorage.setItem('address', profile.address || '');
    localStorage.setItem('licenseNumber', profile.licenseNumber || '');
    localStorage.setItem('licenseExpiry', profile.licenseExpiry || '');
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getName = () => localStorage.getItem('name');
export const getId = () => localStorage.getItem('id');
export const getEmail = () => localStorage.getItem('email');
export const getFirstname = () => localStorage.getItem('firstname');
export const getLastname = () => localStorage.getItem('lastname');
export const getContact = () => localStorage.getItem('contact');
export const getAddress = () => localStorage.getItem('address');
export const getLicenseNumber = () => localStorage.getItem('licenseNumber');
export const getLicenseExpiry = () => localStorage.getItem('licenseExpiry');
export const isLoggedIn = () => Boolean(getToken());

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const logout = () => {
    [
        'token',
        'role',
        'name',
        'id',
        'email',
        'firstname',
        'lastname',
        'contact',
        'address',
        'licenseNumber',
        'licenseExpiry'
    ].forEach((key) => localStorage.removeItem(key));
};

export const registerCustomer = async(data) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    return response.data;
};

export const loginUser = async(data) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data;
};

export const createBooking = async(data) => {
    const response = await axios.post(`${BASE_URL}/bookings`, data, getAuthConfig());
    return response.data;
};

export const getAllVariants = async() => {
    const response = await axios.get(`${BASE_URL}/variants/all`);
    return response.data;
};

export const getVariantById = async(variantId) => {
    const response = await axios.get(`${BASE_URL}/variants/${variantId}`);
    return response.data;
};

export const getAllCompanies = async() => {
    const response = await axios.get(`${BASE_URL}/companies/all`);
    return response.data;
};

export const getCustomerBookings = async(customerId) => {
    const response = await axios.get(
        `${BASE_URL}/bookings/customer/${customerId}`,
        getAuthConfig()
    );
    return response.data;
};

export const getAllBookings = async() => {
    const response = await axios.get(`${BASE_URL}/bookings/all`, getAuthConfig());
    return response.data;
};

export const updateBookingStatus = async(bookingId, status) => {
    const response = await axios.put(
        `${BASE_URL}/bookings/${bookingId}/status`, { status },
        getAuthConfig()
    );
    return response.data;
};