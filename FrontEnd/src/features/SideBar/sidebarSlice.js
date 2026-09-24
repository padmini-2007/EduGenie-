import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const ALLOWED_STATES = ["dashboard", "profile", "studentChatbot", "about"];

const initialState = {
  state: "dashboard",
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    moveSidebar: (state, action) => {
      const page = action.payload;
      if (ALLOWED_STATES.includes(page)) {
        state.state = page;
      } else {
        toast.error(`Invalid sidebar state: "${page}"`);
      }
    },
    setSidebarState: (state, action) => {
      const page = action.payload;
      if (ALLOWED_STATES.includes(page)) {
        state.state = page;
      } else {
        toast.error(`Invalid sidebar state: "${page}"`);
      }
    },
  },
});

export const { moveSidebar, setSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
