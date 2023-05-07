"use client";
import VoteCard from "@/components/VoteCard";
import { useAuth } from "@/firebase/context/AuthContext";
import useFetchAllVotes from "@/firebase/hooks/fetchAllVotes";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const MainVotePage = () => {
  const { currentUser } = useAuth();
  const { error, loading, structuredVotes } = useFetchAllVotes();

  const handleVote = async (hasLiked, voteKey, userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const likesPath = `votes.${voteKey}.${"likes"}`;
      const dislikesPath = `votes.${voteKey}.${"dislikes"}`;

      //IF USER HAS LIKED
      if (hasLiked) {
        //ADD TO LIKED
        await updateDoc(
          docRef,
          { [likesPath]: arrayUnion(currentUser.uid) },
          { merge: true }
        );

        //REMOVE FROM DISLIKED
        await updateDoc(
          docRef,
          { [dislikesPath]: arrayRemove(currentUser.uid) },
          { merge: true }
        );
      } else {
        //ADD TO DISLIKED
        await updateDoc(
          docRef,
          { [dislikesPath]: arrayUnion(currentUser.uid) },
          { merge: true }
        );

        //REMOVE FROM LIKED
        await updateDoc(
          docRef,
          { [likesPath]: arrayRemove(currentUser.uid) },
          { merge: true }
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (loading) return;

  return (
    <>
      {currentUser ? (
        <>
          <div className="pt-40 min-h-screen px-5 flex flex-col items-center">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-center text-center gap-5 ">
              <div className="text-4xl">Scroll down to Vote Yes or No</div>
              <div className="text-[#334155] dark:text-[#94a3b8]"></div>
            </div>

            {/* VOTECARD */}
            {!loading ? (
              <>
                <div className="mt-20 grid grid-flow-row xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
                  {structuredVotes.map((voteObj, i) => {
                    return (
                      <VoteCard
                        voteKey={voteObj.voteKey}
                        question={voteObj.question}
                        userId={voteObj.userId}
                        likes={voteObj.likes}
                        dislikes={voteObj.dislikes}
                        key={i}
                        handleVote={handleVote}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <svg
                  className="h-10 w-10 fill-white animate-spin mt-40"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainVotePage;
