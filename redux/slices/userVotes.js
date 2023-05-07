import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: null
};

export const userVotes = createSlice({
  name: "userVotes",
  initialState,
  reducers: {
    addUserVote: (state, action) => {
      state.value = {
        ...state.value,
        [action.payload.newKey]: {
          name: action.payload.userInput,
          like: [],
          dislike: [],
        },
      };
    },
    removeUserVote: (state, action) => {
      const tempObj = state.value;
      delete tempObj[action.payload];
      state.value = tempObj;
    },
    setUserVotes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addUserVote, removeUserVote, setUserVotes } = userVotes.actions;
export default userVotes.reducer;
