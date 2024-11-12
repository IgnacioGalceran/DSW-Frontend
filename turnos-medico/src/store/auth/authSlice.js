import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isLoading: false,
  uid: null,
  id: null,
  tipoDni: null,
  dni: null,
  email: null,
  displayName: null,
  errorMessage: null,
  rol: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.uid = action.payload.uid;
      state.id = action.payload.id;
      state.tipoDni = action.payload.tipoDni;
      state.dni = action.payload.dni;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.funciones = action.payload.funciones;
      state.rol = action.payload.rol;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.isAuth = false;
      state.isLoading = false;
      state.uid = null;
      state.id = null;
      state.tipoDni = null;
      state.dni = null;
      state.email = null;
      state.displayName = null;
      state.errorMessage = null;
      state.funciones = null;
      state.rol = null;
    },
    checkingCredentials: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer;
