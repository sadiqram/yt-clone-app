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
*/

/*
  .nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
}



*/

"use client";

import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";

import { User } from "firebase/auth";

//lookup js closure
export default function Navbar() {
  //init user state
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((User) => {
      setUser(User);
    });
    //cleanup after the component is unmounted(when the user navigates to a different page)
    return () => unsubscribe();
  });

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="cursor-pointer">
      <span className="flex items-center space-x-2">
        <Image
          src="/youtube-logo.svg"
          alt="Youtube Logo"
          width={90}
          height={20}
        />
        </span>
      </Link>
        <SignIn user={user} />
     
    </nav>
  );
}
