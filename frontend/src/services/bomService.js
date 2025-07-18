import api from '../config/axios';

export const getBOMs = () => api.get('/bom');
export const getBOMItems = () => api.get('/bom-item');

export const createBOM = (data) => api.post('/bom', data);
export const createBOMItem = (data) => api.post('/bom-item', data);

export const updateBOM = (id, data) => api.put(`/bom/${id}`, data);
export const deleteBOM = (id) => api.delete(`/bom/${id}`);

export const updateBOMItem = (id, data) => api.put(`/bom-item/${id}`, data);
export const deleteBOMItem = (id) => api.delete(`/bom-item/${id}`);
