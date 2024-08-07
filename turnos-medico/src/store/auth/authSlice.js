import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false, // 'not-authenticated' , 'authenticated'
  isLoading: false,
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuth = true),
        (state.isLoading = false),
        (state.uid = action.payload.uid),
        (state.email = action.payload.email),
        (state.displayName = `${action.payload.nombre} ${action.payload.apellido}`),
        (state.errorMessage = null);
    },
    logout: (state) => {
      (state.isAuth = false),
        (state.isLoading = false),
        (state.uid = null),
        (state.email = null),
        (state.displayName = null),
        (state.errorMessage = null);
    },
    checkingCredentials: (state) => {
      state.isLoading = true;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer;
