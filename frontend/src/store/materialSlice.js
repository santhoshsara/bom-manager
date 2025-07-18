import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from '../services/materialService';

export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  const res = await getMaterials();
  return res.data;
});

export const createNewMaterial = createAsyncThunk('materials/create', async (data) => {
  await createMaterial(data);
  return data;
});

export const updateExistingMaterial = createAsyncThunk('materials/update', async ({ id, data }) => {
  await updateMaterial(id, data);
  return { id, data };
});

export const deleteExistingMaterial = createAsyncThunk('materials/delete', async (id) => {
  await deleteMaterial(id);
  return id;
});

const materialSlice = createSlice({
  name: 'materials',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default materialSlice.reducer;
