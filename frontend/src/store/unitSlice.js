
// src/store/unitSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUnits, createUnit, updateUnit, deleteUnit } from '../services/unitService';

export const fetchUnits = createAsyncThunk('units/fetch', async () => {
  const res = await getUnits();
  return res.data;
});

export const createNewUnit = createAsyncThunk('units/create', async (data) => {
  await createUnit(data);
  return data;
});

export const updateExistingUnit = createAsyncThunk('units/update', async ({ id, data }) => {
  await updateUnit(id, data);
  return { id, data };
});

export const deleteExistingUnit = createAsyncThunk('units/delete', async (id) => {
  await deleteUnit(id);
  return id;
});

const unitSlice = createSlice({
  name: 'units',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUnits.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default unitSlice.reducer;

