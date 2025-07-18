
// src/store/supplierSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';

export const fetchSuppliers = createAsyncThunk('suppliers/fetch', async () => {
  const res = await getSuppliers();
  return res.data;
});

export const createNewSupplier = createAsyncThunk('suppliers/create', async (data) => {
  await createSupplier(data);
  return data;
});

export const updateExistingSupplier = createAsyncThunk('suppliers/update', async ({ id, data }) => {
  await updateSupplier(id, data);
  return { id, data };
});

export const deleteExistingSupplier = createAsyncThunk('suppliers/delete', async (id) => {
  await deleteSupplier(id);
  return id;
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default supplierSlice.reducer;
