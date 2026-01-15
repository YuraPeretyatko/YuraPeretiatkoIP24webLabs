import axios from 'axios';

const API_URL = 'http://localhost:3000/api/clips';

const $api = axios.create({
    baseURL: API_URL,
});

export const fetchClips = (params) => {
    return $api.get('/', { params });
};

export const fetchClipById = (id) => {
    return $api.get(`/${id}`);
};