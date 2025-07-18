// store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await getProducts();
  return res.data;
});

export const createNewProduct = createAsyncThunk('products/create', async (data) => {
  await createProduct(data);
  return data;
});

export const updateExistingProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  await updateProduct(id, data);
  return { id, data };
});

export const deleteExistingProduct = createAsyncThunk('products/delete', async (id) => {
  await deleteProduct(id);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default productSlice.reducer;
