import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Apiservices from '../../apiServices/apiService'
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
    try {
        const response = await Apiservices.getUserData();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to fetch data');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.isLoading = false;
                state.user = user;
                state.isAuthenticated = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice;
