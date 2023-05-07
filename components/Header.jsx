"use client";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useAuth } from "@/firebase/context/AuthContext";
import Drawer from "./Drawer";
import { useState } from "react";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="fixed z-10 flex w-full justify-between py-4 border-b bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-600 px-5 items-center text-center">
      <Link className="text-3xl font-bold cursor-pointer" href="/">
        Vote Wars
      </Link>
      {currentUser && (
        <div className="hidden md:flex gap-8">
          <Link
            href="/votes"
            className="hover:scale-110 hover:text-sky-400 transition cursor-pointer"
          >
            Vote
          </Link>
          <Link
            href="/createvote"
            className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
          >
            Create vote
          </Link>
          <Link
            href="/about"
            className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
          >
            About
          </Link>
        </div>
      )}
      <div className="hidden md:flex gap-4">
        {currentUser ? (
          <div className="flex items-center">
            <Link
              onClick={() => logout()}
              href="/"
              className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <Link
              href="/auth/signin"
              className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/auth/login"
              className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
            >
              Log In
            </Link>
          </div>
        )}

        <div className="border-r border-slate-300 dark:border-slate-600 ml-1.5" />

        {/* LIGHT AND DARK MODE */}
        <ThemeSwitch />
      </div>
      <div className="flex md:hidden gap-2">
        <ThemeSwitch />
        <div className="border-r border-slate-300 dark:border-slate-600 ml-1.5" />
        {/* HAMBURGER */}

        <button
          className="ml-3 hover:scale-110 dark:hover:opacity-70 transition cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <svg
            className="fill-[#0f172a] dark:fill-[#e2e8f0] h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
      </div>

      {/* DRAWER */}
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <div className="flex flex-col gap-4 text-xl">
          <Link
            href="/"
            onClick={() => setIsDrawerOpen(false)}
            className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
          >
            Home
          </Link>
          {currentUser ? (
            <>
              <Link
                href="/votes"
                onClick={() => setIsDrawerOpen(false)}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                Vote
              </Link>
              <Link
                href="/createvote"
                onClick={() => setIsDrawerOpen(false)}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                Create vote
              </Link>
              <Link
                href="/about"
                onClick={() => setIsDrawerOpen(false)}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                About
              </Link>
              <Link
                href="/"
                onClick={() => logout()}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                onClick={() => setIsDrawerOpen(false)}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setIsDrawerOpen(false)}
                className=" hover:scale-110 hover:text-sky-400 transition cursor-pointer"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
