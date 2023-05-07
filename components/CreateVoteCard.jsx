import { useDispatch, useSelector } from "react-redux";
import { updateUserInput } from "@/redux/slices/userInput";
import { addUserVote } from "@/redux/slices/userVotes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useAuth } from "@/firebase/context/AuthContext";

const CreateVoteCard = () => {
  const userInput = useSelector((state) => state.userInput.value);
  const userVotes = useSelector((state) => state.userVotes.value);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!userInput) return;

    //CREATE THE KEY
    let newKey = 1;

    if (userVotes) {
      newKey =
        Object.keys(userVotes).length === 0
          ? 1
          : Math.max(...Object.keys(userVotes)) + 1;
    }

    //REDUX
    dispatch(addUserVote({ userInput, newKey }));

    //FIRESTORE
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        votes: {
          [newKey]: {
            name: userInput,
            likes: [],
            dislikes: [],
          },
        },
      },
      { merge: true }
    );

    //RESET INPUT
    dispatch(updateUserInput(""));
  };

  return (
    <div className="w-full max-w-[450px] bg-white dark:bg-slate-800 h-min text-center rounded-3xl p-5 flex flex-col justify-between gap-8">
      <div>
        <input
          className="w-full outline-none rounded-2xl py-3 px-4 bg-transparent border transition-colors border-slate-400 focus:border-slate-800 dark:focus:border-slate-100"
          value={userInput}
          onChange={(e) => dispatch(updateUserInput(e.target.value))}
          type="text"
          name="CreateVoteCard-input"
          id="CreateVoteCard-input"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="text-center text-lg font-bold p-2 border border-sky-500 text-sky-500 rounded-full cursor-pointer hover:scale-105 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateVoteCard;
