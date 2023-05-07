import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/context/AuthContext";

const VoteCard = ({
  question,
  voteKey,
  handleVote,
  userId,
  likes,
  dislikes,
}) => {
  const [isLiked, setIsLiked] = useState(undefined);
  const [hasVoted, setHasVoted] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [likesPercentage, setLikesPercentage] = useState();
  const [dislikesPercentage, setDislikesPercentage] = useState();
  const { currentUser } = useAuth();

  const initialVotingCheck = () => {
    const likeCount = likes.length;
    const dislikeCount = dislikes.length;

    //if likecount and dislikecount are not empty
    if (likeCount >= 1 || dislikeCount >= 1) {
      //check if dislikeCount or likesCount is null
      if (dislikeCount === 0) {
        setDislikesPercentage(0);
        setLikesPercentage(100);
      }
      if (likeCount === 0) {
        setLikesPercentage(100);
        setDislikesPercentage(0);
      }
      //check if user has liked
      if (likes.includes(currentUser.uid)) {
        setIsLiked(true);
        setHasVoted(true);
      }
      if (dislikes.includes(currentUser.uid)) {
        setIsLiked(false);
        setHasVoted(true);
      }

      //calculate the percentage
      const sum = likeCount + dislikeCount;
      const likePer = (likeCount / sum) * 100;
      const dislikePer = (dislikeCount / sum) * 100;

      setLikesPercentage(likePer);
      setDislikesPercentage(dislikePer);
    } else {
      setLikesPercentage(0);
      setDislikesPercentage(0);
    }
    setInitLoading(false);
  };

  //console.log(likes, dislikes);

  const reloadVotingCheck = () => {
    if (initLoading) return;

    //calculate length of arrays
    let likeCount = likes.length;
    let dislikeCount = dislikes.length;

    //if user has revoted
    if (hasVoted) {
      //if user has previously voted
      if (
        isLiked &&
        !likes.includes(currentUser.uid) &&
        dislikes.includes(currentUser.uid)
      ) {
        likeCount++;
        dislikeCount--;
      } else if (
        !isLiked &&
        !dislikes.includes(currentUser.uid) &&
        likes.includes(currentUser.uid)
      ) {
        dislikeCount++;
        likeCount--;
      }
      //if first time voting
      else if (
        !dislikes.includes(currentUser.uid) &&
        !likes.includes(currentUser.uid)
      ) {
        if (isLiked) {
          likeCount++;
        } else {
          dislikeCount++;
        }
      }
    }

    //handle the percentage
    if (likeCount === 0 && dislikeCount === 0) {
      setLikesPercentage(0);
      setDislikesPercentage(0);
    } else if (dislikeCount === 0) {
      setDislikesPercentage(0);
      setLikesPercentage(100);
    } else if (likeCount === 0) {
      setLikesPercentage(0);
      setDislikesPercentage(100);
    } else {
      //calculate the percentage
      const sum = likeCount + dislikeCount;
      const likePer = (likeCount / sum) * 100;
      const dislikePer = (dislikeCount / sum) * 100;
      //console.log(`${likeCount} => ${likePer}`);
      //console.log(`${dislikeCount} => ${dislikePer}`);

      setLikesPercentage(Math.floor(likePer));
      setDislikesPercentage(Math.floor(dislikePer));
    }

    //console.log(`Likes => ${likes} --- Count => ${likeCount}`);
    //console.log(`Dislikes => ${dislikes} --- Count => ${dislikeCount}`);
  };
  //console.log(hasVoted)

  const handleLike = () => {
    setIsLiked(true);
    setHasVoted(true);
    //if (!isLiked) setHasRevoted(true);
    handleVote(true, voteKey, userId);
  };

  const handleDislike = () => {
    setIsLiked(false);
    setHasVoted(true);
    //if (isLiked) setHasRevoted(true);
    handleVote(false, voteKey, userId);
  };

  useEffect(() => {
    reloadVotingCheck();
  });
  useEffect(() => {
    initialVotingCheck();
  }, []);

  //console.log(`Likes => ${likes}`);
  //console.log(`Dislikes => ${dislikes}`);

  return (
    <>
      <div
        className={`${
          hasVoted
            ? isLiked
              ? "bg-gradient-to-r from-green-500 to-green-400 dark:from-green-600 dark:to-green-500"
              : "bg-gradient-to-r from-red-400 to-red-500 dark:from-red-500 dark:to-red-600"
            : "bg-white  dark:bg-slate-800"
        } w-72 h-min text-center rounded-3xl p-5 flex flex-col justify-between gap-8`}
      >
        <div className="text-xl">{question}</div>

        <div className="flex justify-between gap-6">
          <button
            onClick={handleLike}
            className={` ${
              hasVoted ? (isLiked ? "scale-110" : "") : ""
            } bg-gradient-to-r from-green-400 to-green-500 hover:scale-110 hover:opacity-90 transition grow flex flex-col items-center justify-center gap-2 py-3 rounded-2xl`}
          >
            <svg
              className={`${hasVoted ? "h-7" : "h-10"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
            </svg>
            {hasVoted ? (
              <>
                <div className="text-2xl ">{`${likesPercentage}%`}</div>
              </>
            ) : (
              <></>
            )}
          </button>
          <button
            onClick={handleDislike}
            className={` ${
              hasVoted ? (isLiked ? "" : "scale-110") : ""
            } bg-gradient-to-r from-red-500 to-red-400 hover:scale-110 hover:opacity-90 transition grow flex flex-col items-center justify-center gap-2 py-3 rounded-2xl`}
          >
            <svg
              className={hasVoted ? "h-7" : "h-10"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
            </svg>
            {hasVoted ? (
              <>
                <div
                  className={isLiked ? "text-xl" : "text-2xl"}
                >{`${dislikesPercentage}%`}</div>
              </>
            ) : (
              <></>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
