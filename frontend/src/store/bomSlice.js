import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBOMs,
  createBOM,
  updateBOM,
  deleteBOM,
  getBOMItems,
  createBOMItem,
  updateBOMItem,
  deleteBOMItem,
} from "../services/bomService";

// ----------- Async Thunks ------------

// BOMs
export const fetchBOMs = createAsyncThunk("boms/fetch", async () => {
  const res = await getBOMs();
  return res.data;
});

export const createNewBOM = createAsyncThunk("boms/create", async (data) => {
  const res = await createBOM(data);
  return res.data;
});

export const updateExistingBOM = createAsyncThunk(
  "boms/update",
  async ({ id, data }) => {
    await updateBOM(id, data);
    return { id, data };
  }
);

export const deleteExistingBOM = createAsyncThunk("boms/delete", async (id) => {
  await deleteBOM(id);
  return id;
});

// BOM Items
export const fetchBOMItems = createAsyncThunk("bomItems/fetch", async () => {
  const res = await getBOMItems();
  return res.data;
});

export const createNewBOMItem = createAsyncThunk(
  "bomItems/create",
  async (data) => {
    const res = await createBOMItem(data);
    return res.data;
  }
);

export const updateExistingBOMItem = createAsyncThunk(
  "bomItems/update",
  async ({ id, data }) => {
    await updateBOMItem(id, data);
    return { id, data };
  }
);

export const deleteExistingBOMItem = createAsyncThunk(
  "bomItems/delete",
  async (id) => {
    await deleteBOMItem(id);
    return id;
  }
);

// ----------- Slice ------------

const bomSlice = createSlice({
  name: "boms",
  initialState: {
    items: [], // All BOMs
    bomItems: [], // All BOM Items
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch BOMs
      .addCase(fetchBOMs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBOMs.fulfilled, (state, action) => {
        console.log(state, action)
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBOMs.rejected, (state) => {
        state.loading = false;
      })

      // Create BOM
      .addCase(createNewBOM.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update BOM
      .addCase(updateExistingBOM.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.data,
          };
        }
      })

      // Delete BOM
      .addCase(deleteExistingBOM.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
        state.bomItems = state.bomItems.filter(
          (item) => item.bomId !== action.payload
        );
      })

      // Fetch BOM Items
      .addCase(fetchBOMItems.fulfilled, (state, action) => {
        state.bomItems = action.payload;
      })

      // Create BOM Item
      .addCase(createNewBOMItem.fulfilled, (state, action) => {
        state.bomItems.push(action.payload);
      })

      // Update BOM Item
      .addCase(updateExistingBOMItem.fulfilled, (state, action) => {
        const index = state.bomItems.findIndex(
          (i) => i.id === action.payload.id
        );
        if (index !== -1) {
          state.bomItems[index] = {
            ...state.bomItems[index],
            ...action.payload.data,
          };
        }
      })

      // Delete BOM Item
      .addCase(deleteExistingBOMItem.fulfilled, (state, action) => {
        state.bomItems = state.bomItems.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default bomSlice.reducer;
