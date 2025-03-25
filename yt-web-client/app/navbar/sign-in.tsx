/*
    .signin {
  display: inline-block;
  border: 1px solid gray;
  color: #065fd4;
  padding: 10px 20px;
  border-radius: 24px;
  font-family: "Roboto","Arial",sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.signin:hover {
  background-color: #bee0fd;
  border: 1px solid transparent;
}

convert to tailwaind css

*/
"use client";

import { signInWithGoogle, signOut } from "../firebase/firebase";
import { Fragment } from "react";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return(
  <Fragment>
    {user ? (
      //show sign out button if the user is signed in
      <button
        onClick={signOut}
        className="px-5 py-2 border border-gray-400 text-[#065fd4] rounded-full font-medium text-sm cursor-pointer hover:bg-[#bee0fd] hover:border-transparent transition0"
      >
        Sign Out
      </button>
    ) : (
      //show sign in button if the user is not signed in
      <button
        onClick={signInWithGoogle}
        className="px-5 py-2 border border-gray-400 text-[#065fd4] rounded-full font-medium text-sm cursor-pointer hover:bg-[#bee0fd] hover:border-transparent transition"
      >
        Sign In
      </button>
    )}
  </Fragment>
  );
}
