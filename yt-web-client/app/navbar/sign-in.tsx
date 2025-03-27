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
.signin {
  @apply inline-block border text-[#065fd4] text-sm font-medium cursor-pointer px-5 py-2.5 rounded-3xl border-solid border-[gray] hover:bg-[#bee0fd] hover:border hover:border-solid hover:border-transparent;
  font-family: "Roboto", "Arial", sans-serif;
}

*/
"use client";

import { signInWithGoogle, signOut } from "../firebase/firebase";
import { Fragment } from "react";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <Fragment>
      {user ? (
        //show sign out button if the user is signed in
        <button
          onClick={signOut}
          className="inline-block border text-[#065fd4] text-sm font-medium cursor-pointer px-5 py-2.5 rounded-3xl border-solid border-[gray] hover:bg-[#bee0fd] hover:border hover:border-solid hover:border-transparent "
        >
          Sign Out
        </button>
      ) : (
        //show sign in button if the user is not signed in
        <button
          onClick={signInWithGoogle}
          className="inline-block border text-[#065fd4] text-sm font-medium cursor-pointer px-5 py-2.5 rounded-3xl border-solid border-[gray] hover:bg-[#bee0fd] hover:border hover:border-solid hover:border-transparent"

        >
          Sign In to upload videos
        </button>
      )}
    </Fragment>
  );
}
