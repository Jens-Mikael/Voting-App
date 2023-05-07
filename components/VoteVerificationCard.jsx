"use client";
import { toggleVoteVerification } from "@/redux/slices/voteVerification";

import { useDispatch } from "react-redux";

const VoteVerificationCard = ({ handleSubmit, voteKey }) => {
  const dispatch = useDispatch();
  

  return (
    <>
      <div className="inset-0 z-10 fixed flex justify-center items-center">
        <div
          onClick={() => dispatch(toggleVoteVerification())}
          className="fixed w-full h-full inset-0 bg-black bg-opacity-40"
        />
        <div className="w-72 p-5 pt-10 gap-14 z-20 bg-white dark:bg-slate-800 flex flex-col justify-between rounded-3xl">
          <div className="text-2xl font-medium">Are you sure?</div>
          <div className="flex flex-col gap-5">
            <button
              className="text-center text-lg font-bold p-2 border border-sky-500 text-sky-500 rounded-full cursor-pointer hover:scale-105 transition"
              onClick={() => {
                console.log(voteKey);
                handleSubmit();
              }}
            >
              DESTROY IT
            </button>
            <button
              className="flex justify-center w-full text-center text-lg font-bold p-2 border border-[#0f172a] dark:border-[#e2e8f0] text-[#0f172a] dark:text-[#e2e8f0] rounded-full cursor-pointer hover:scale-105 transition"
              onClick={() => dispatch(toggleVoteVerification())}
            >
              Naah, I'm keeping it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteVerificationCard;
