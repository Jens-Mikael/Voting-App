import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { setUserVotes } from "@/redux/slices/userVotes";

const useFetchUserVotes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          dispatch(setUserVotes(null));
          return;
        }
        
        dispatch(setUserVotes(docSnap.data().votes));
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    error,
  };
};

export default useFetchUserVotes;
