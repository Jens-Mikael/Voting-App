"use client";
import AuthBox from "@/components/AuthBox";
import { useAuth } from "@/firebase/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthPage = ({ params }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center p-5 pt-40">
      {currentUser ? (
        <div>
          {/* <div>You're logged in!</div>
          <Link href="/">
            <div>Press here to navigate to home page</div>
          </Link> */}
        </div>
      ) : (
        <>
          <AuthBox authMethod={params.authMethod} />
        </>
      )}
    </div>
  );
};

export default AuthPage;
