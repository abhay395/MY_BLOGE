import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featchUser, updateUser, fetchUserBloge } from "./UserApi";

const initialState = {
    userData: null,
    userBloge:null,
    loading: false,
    error: null,
};

export const featchUserAsync = createAsyncThunk(
    "user/featchUser",
    async () => {
        const response = await featchUser();
        // console.log(response.data)
        return response.data
    }
)
export const featchUserBlogeAsync = createAsyncThunk(
    "user/fetchuserBloge",
    async () => {
        const response = await fetchUserBloge();
        // console.log(response.data)
        return response.data
    }
)
export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async (userData)=>{
        // console.log(userData)
        const response = await updateUser({userData})
        return response.data;
    }
)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser:(state)=>{
            state.userData=null
            state.userBloge=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(featchUserAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(featchUserAsync.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.userData = action.payload
            })
            .addCase(featchUserAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(featchUserBlogeAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(featchUserBlogeAsync.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.userBloge = action.payload
            })
            .addCase(featchUserBlogeAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.userData = action.payload
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })

    },
});

export const selectUserBloges = (state) => state.user.userBloge
export const selectUser = (state) => state.user.userData
// export const loadingforProfile = (state) => state.user.loading

// export const selectSingleBloges = (state) => state.bloge.detailebloge
export const Status = (state) => state.user.status
export const {setUser} = userSlice.actions
export default userSlice.reducer