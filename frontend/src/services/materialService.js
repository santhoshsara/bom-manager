import api from '../config/axios';

export const getMaterials = () => api.get('/material');
export const createMaterial = (data) => api.post('/material', data);
export const updateMaterial = (id, data) => api.put(`/material/${id}`, data);
export const deleteMaterial = (id) => api.delete(`/material/${id}`);
