import axios from 'axios';

// Create an instance of Axios to set base URL
export const apiClient = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
