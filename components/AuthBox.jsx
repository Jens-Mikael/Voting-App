"use client";
import { useState } from "react";
import { useAuth } from "../firebase/context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Link from "next/link";

const AuthBox = ({ authMethod }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pageType, setPageType] = useState(authMethod);
  const [error, setError] = useState(null);

  const { login, signup, googleAuth, githubAuth, currentUser, userInfo } = useAuth();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("No email or password");
      return;
    }

    //login
    if (pageType === "login") {
      try {
        const res = await login(email, password);
        if (res) router.push("/")
      } catch (err) {
        setError(err.message);
      }
    }
    //sign up
    else {
      try {
        const res = await signup(email, password);
        if (res) router.push("/")
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGmailAuth = async () => {
    try {
      const res = await googleAuth();
      if (res) router.push("/");
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGithubAuth = async () => {
    try {
      const res = await githubAuth();
      console.log(res.user);
      if (res) router.push("/");
    } catch (err) {
      setError(err.message)
    }
  }


  return (
    <div className=" w-full max-w-[550px] p-5 rounded-3xl bg-white dark:bg-slate-800 flex flex-col items-center gap-6">
      <div className="text-3xl mb-2">
        {pageType === "login" ? "Log in" : "Sign in"}
      </div>
      <div>
        {pageType === "login" ? "New to Vote-Wars?" : "Already an user?"}{" "}
        <Link href={pageType === "login" ? "/auth/signin" : "/auth/login"}>
          <span className="text-sky-500 hover:underline cursor-pointer">
            {pageType === "login" ? "Sign in" : "Login"}
          </span>
        </Link>
      </div>
      {error && (
        <>
          <div className="text-sm">{`Error: ${error}`}</div>
        </>
      )}
      <div className="w-full">
        <input
          className="w-full outline-none rounded py-2 px-3 bg-transparent border transition-colors border-slate-400 focus:border-slate-800 dark:focus:border-slate-100"
          placeholder="your@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          className="w-full outline-none rounded py-2 px-3 bg-transparent border transition-colors border-slate-400 focus:border-slate-800 dark:focus:border-slate-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        onClick={handleSubmit}
        className="w-full text-center text-lg font-bold p-2 border border-sky-500 text-sky-500 rounded-full cursor-pointer hover:scale-105 transition"
      >
        {pageType === "login" ? "LOGIN" : "SIGNIN"}
      </div>
      <div className="flex items-center gap-3 w-full">
        <div className="border-b border-slate-400 grow " />
        <div>OR</div>
        <div className="border-b border-slate-400 grow" />
      </div>
      <div className="w-full gap-5 flex text-center">
        <div onClick={handleGithubAuth} className=" bg-[#010409] py-2.5 rounded-full flex justify-center grow hover:scale-110 transition cursor-pointer">
          <svg
            className="h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </div>
        <div onClick={handleGmailAuth} className="bg-white py-2.5 rounded-full border border-slate-400 dark:border-none flex justify-center text-center grow hover:scale-110 transition cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            className="h-6"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
