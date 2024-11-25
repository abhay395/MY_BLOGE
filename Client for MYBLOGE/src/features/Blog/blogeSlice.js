import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBloge,
  delteBloge,
  featchBlogeById,
  featchBloges,
  featchBlogesByUser,
  updateBlogeById,
} from "./blogeApi";

const initialState = {
  bloges: null,
  blogesForFrontPage: null,
  userBloge: null,
  loading: false,
  error: null,
  detailebloge: null,
  editBloge: null,
  total: 0,
};

export const delteBlogeAsync = createAsyncThunk(
  "bloge/deleteBloge",
  async (id) => {
    const response = await delteBloge(id);
    return response.data;
  }
);
export const featchBlogesAsync = createAsyncThunk(
  "bloge/featchBloges",
  async (page, limit) => {
    const response = await featchBloges(page, limit);
    return response.data;
  }
);
export const featchBlogesByUserAsync = createAsyncThunk(
  "bloge/featchBlogesByUser",
  async () => {
    const response = await featchBlogesByUser();
    return response.data;
  }
);
export const featchBlogeByIdAsync = createAsyncThunk(
  "bloge/featchBlogeById",
  async (id) => {
    const response = await featchBlogeById(id);
    return response.data;
  }
);
export const updateBlogeByIdAsync = createAsyncThunk(
  "bloge/updateBlogeById",
  async (data) => {
    const response = await updateBlogeById(data);
    return response.data;
  }
);
export const createBlogeAsync = createAsyncThunk(
  "bloge/createBloge",
  async ({ bloge }) => {
    const response = await createBloge({ bloge });
    return response.data;
  }
);
export const blogeSlice = createSlice({
  name: "bloge",
  initialState,
  reducers: {
    setEditBloge: (state, action) => {
      state.detailebloge = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(featchBlogesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(featchBlogesAsync.fulfilled, (state, action) => {
        state.loading = false;
        if(state.blogesForFrontPage==null) state.blogesForFrontPage = action.payload.bloge;
        state.bloges = action.payload.bloge;
        state.total = action.payload.totalDocs;
      })
      .addCase(featchBlogesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(featchBlogesByUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(featchBlogesByUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userBloge = action.payload.blogs;
      })
      .addCase(featchBlogesByUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(featchBlogeByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(featchBlogeByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.detailebloge = action.payload;
      })
      .addCase(featchBlogeByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlogeByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogeByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.bloges = state.bloges.map((blog) =>
          blog._id === action.payload._id
            ? { ...blog, ...action.payload }
            : blog
        );

        state.blogesForFrontPage = state.blogesForFrontPage.map((blog) =>
          blog._id === action.payload._id
            ? { ...blog, ...action.payload }
            : blog
        );

        state.userBloge = state.userBloge?.map((blog) =>
          blog._id === action.payload._id
            ? { ...blog, ...action.payload }
            : blog
        );
      })
      .addCase(updateBlogeByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBlogeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlogeAsync.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(state.blogesForFrontPage?.length);
        state.blogesForFrontPage.unshift(action.payload);
        state.bloges.unshift(action.payload);
        state.userBloge?.unshift(action.payload);
      })
      .addCase(createBlogeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(delteBlogeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(delteBlogeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const bloges = state.blogesForFrontPage;
        const id = action.payload._id;
        state.blogesForFrontPage = state.blogesForFrontPage.filter(
          (bloge) => bloge._id != id
        );
        state.bloges = state.bloges.filter((bloge) => bloge._id != id);
        state.userBloge = state.userBloge.filter((bloge) => bloge._id != id);
      })
      .addCase(delteBlogeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectBloges = (state) => state.bloge.bloges;
export const selectBlogesForFrontPage = (state) =>
  state.bloge.blogesForFrontPage;
export const selectSingleBloges = (state) => state.bloge.detailebloge;
export const selectBlogesforUser = (state) => state.bloge.userBloge;
export const totalblogs = (state) => state.bloge.total;
export const Loading = (state) => state.bloge.loading;
export const { setEditBloge } = blogeSlice.actions;
export default blogeSlice.reducer;
