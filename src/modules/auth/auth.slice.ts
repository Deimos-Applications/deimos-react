import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/user.model";
import { UserAuth } from "./models/userAuth.model";

export interface AuthState {
  loggedIn: boolean;
  user: (UserAuth & Partial<User>) | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.loggedIn = payload;
    },

    setUserAuth: (state, { payload }: PayloadAction<UserAuth | null>) => {
      state.user = payload;
    },

    updateUserAuth: function (
      state,
      { payload }: PayloadAction<User & Partial<User>>
    ) {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { setLoggedIn, setUserAuth, updateUserAuth } = authSlice.actions;

export const loggedInSelector = (state: { auth: AuthState }) =>
  state.auth.loggedIn;

export const userSelector = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
