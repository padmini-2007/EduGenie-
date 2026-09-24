import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
};

export const chatSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addQuery: (state, action) => {
      const query = action.payload;
      state.conversations.push([{ sender: "user", text: query }]);
    },

    addResponse: (state, action) => {
      const response = action.payload;

      const convoToUpdate = state.conversations.find(
        (convo) => !convo.some((msg) => msg.sender === "bot")
      );

      if (convoToUpdate) {
        convoToUpdate.push({ sender: "bot", text: response });
      }
    },

    clearConversations: (state) => {
      state.conversations = [];
    },
  },
});

export const { addQuery, addResponse, clearConversations } = chatSlice.actions;
export default chatSlice.reducer;
