import { configureStore } from "@reduxjs/toolkit";
import voteVerificationReducer from "./slices/voteVerification";
import userVotesReducer from "./slices/userVotes";
import userInputReducer from "./slices/userInput";

export const store = configureStore({
  reducer: {
    voteVerification: voteVerificationReducer,
    userVotes: userVotesReducer,
    userInput: userInputReducer,
  },
});
