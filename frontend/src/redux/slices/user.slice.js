import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    username: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
