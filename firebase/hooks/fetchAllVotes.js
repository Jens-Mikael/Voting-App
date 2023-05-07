import { useState, useEffect } from "react";
import { doc, getDocs, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "@/firebase";

const useFetchAllVotes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [structuredVotes, setStructuredVotes] = useState([]);

  const fetchData = async () => {
    try {
      const docSnap = await getDocs(collection(db, "users"));
      const data = structureData(docSnap);
      setStructuredVotes(data);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const structureData = (obj) => {
    let newArr = [];
    obj.forEach((doc) => {
      Object.keys(doc.data().votes).map((voteKey) => {
        newArr.push({
          voteKey: voteKey,
          question: doc.data().votes[voteKey].name,
          likes: doc.data().votes[voteKey].likes,
          dislikes: doc.data().votes[voteKey].dislikes,
          userId: doc.id,
        });
      });
    });
    return newArr;
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  return {
    loading,
    error,
    structuredVotes,
  };
};

export default useFetchAllVotes;
