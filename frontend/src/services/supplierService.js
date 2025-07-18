import api from '../config/axios';

export const getSuppliers = () => api.get('/supplier');
export const createSupplier = (data) => api.post('/supplier', data);
export const updateSupplier = (id, data) => api.put(`/supplier/${id}`, data);
export const deleteSupplier = (id) => api.delete(`/supplier/${id}`);
