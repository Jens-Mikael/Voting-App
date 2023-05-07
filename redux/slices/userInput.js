import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ""
};

export const userInput = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    updateUserInput: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { updateUserInput } = userInput.actions;
export default userInput.reducer;
