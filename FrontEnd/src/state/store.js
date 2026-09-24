import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "../features/ChatBot/chatBotSlice";
import sidebarReducer from "../features/SideBar/sidebarSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
    sidebar: sidebarReducer,
  },
});
