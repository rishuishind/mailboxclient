import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { isLoggedIn: false, isloggingIn: true, token: '' };

const AuthSlice = createSlice({
    name: 'Authentication',
    initialState: authInitialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        toggleLogin: (state) => {
            state.isloggingIn = !state.isloggingIn;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = '';
        }
    }
});

export const authActions = AuthSlice.actions;
export default AuthSlice;