import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const voteVerificationSlice = createSlice({
  name: "voteVerification",
  initialState,
  reducers: {
    toggleVoteVerification: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleVoteVerification } = voteVerificationSlice.actions;
export default voteVerificationSlice.reducer;
