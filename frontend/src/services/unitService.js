import api from '../config/axios';

export const getUnits = () => api.get('/unit');
export const createUnit = (data) => api.post('/unit', data);
export const updateUnit = (id, data) => api.put(`/unit/${id}`, data);
export const deleteUnit = (id) => api.delete(`/unit/${id}`);
