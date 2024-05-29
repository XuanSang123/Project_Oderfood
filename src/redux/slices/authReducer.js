import { createSlice } from "@reduxjs/toolkit";

// const [isLogin, setIsLogin] = useState(false);

const authSlice = createSlice({
  // Tao ten cho store
  name: "auth",
  // Tao gia tri khoi tao
  initialState: {
    isLogin: !!localStorage.getItem("TOKEN") || false,
  },
  // Tao cac func set state
  reducers: {
    // Set state la true
    login: (state) => {
      state.isLogin = true;
    },
    // Set state la false
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

const { actions, reducer } = authSlice;
export const { login, logout } = actions;

export default reducer;
