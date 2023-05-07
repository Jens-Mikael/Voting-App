import VoteVerificationCard from "./VoteVerificationCard";
import { toggleVoteVerification } from "@/redux/slices/voteVerification";
import { removeUserVote } from "@/redux/slices/userVotes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { useAuth } from "@/firebase/context/AuthContext";
import { db } from "@/firebase/firebase-config";
import { useEffect, useState } from "react";

const UserVoteCard = ({ children, voteKey, likes, dislikes }) => {
  const [likesPercentage, setLikesPercentage] = useState(0);
  const [dislikesPercentage, setDislikesPercentage] = useState(0);
  const dispatch = useDispatch();
  const isVoteVerificationVisible = useSelector(
    (state) => state.voteVerification.value
  );
  const { currentUser } = useAuth();
  const handleSubmit = async () => {
    //dispatch(toggleVoteVerification());

    dispatch(removeUserVote(voteKey));

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        votes: {
          [voteKey]: deleteField(),
        },
      },
      { merge: true }
    );
  };

  const calculateLikes = () => {
    if (!likes && !dislikes) return; 

    const likeLength = likes.length;
    const dislikeLength = dislikes.length;

    if (likeLength === 0 && dislikeLength >= 1) {
      setDislikesPercentage(100);
    } else if (dislikeLength === 0 && likeLength >= 1) {
      setLikesPercentage(100);
    } else if (dislikeLength >= 1 && likeLength >= 1) {
      const sum = likeLength + dislikeLength;
      const likePer = likeLength / sum;
      const dislikePer = dislikeLength / sum;
      setDislikesPercentage(Math.floor(dislikePer));
      setLikesPercentage(Math.floor(likePer));
    }
  };

  useEffect(() => {
    calculateLikes();
  }, []);

  return (
    <div className=" text-xl bg-white dark:bg-slate-800 w-72 h-min text-center rounded-3xl p-5 flex flex-col justify-between gap-8">
      <div>{children}</div>
      <div className="flex justify-around text-[#0f172a]">
        <div className="flex flex-col gap-1 py-3 px-8 rounded-3xl bg-gradient-to-r from-green-400 to-green-500">
          <svg
            className="h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
          </svg>
          {`${likesPercentage}%`}
        </div>
        <div className="flex flex-col gap-1 py-3 px-8 rounded-3xl bg-gradient-to-r from-red-400 to-red-500">
          <svg
            className="h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
          </svg>
          {`${dislikesPercentage}%`}
        </div>
      </div>
      <div>
        <button
          onClick={() => handleSubmit()}
          className="flex justify-center w-full text-center text-lg font-bold p-3 border border-[#0f172a] dark:border-[#e2e8f0] rounded-full cursor-pointer hover:scale-105 transition"
        >
          <svg
            className="h-8 fill-[#0f172a] dark:fill-[#e2e8f0]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
        </button>
      </div>
      {isVoteVerificationVisible && (
        <VoteVerificationCard handleSubmit={handleSubmit} voteKey={voteKey} />
      )}
    </div>
  );
};

export default UserVoteCard;
