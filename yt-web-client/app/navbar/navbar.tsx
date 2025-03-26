

"use client";

import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";
import Upload from "./upload";


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
    <nav className="flex justify-between items-center p-[1em]">
      <Link href="/">
        <Image src="/youtube-logo.svg" alt="logo" width={90} height={20} />
      </Link>
      {user && (
        <div className="flex justify-center items-center w-[25px] h-[25px] text-[black] cursor-pointer text-[10px] p-[0.4em] rounded-[50%] border-[none] hover:bg-[rgb(230,230,230)]">
          <Upload />
          {/* <span className=" w-[60px] bg-[white] text-[black] text-center absolute z-[1] ml-[-30px] opacity-0 transition-opacity duration-[0.3s] px-0 py-[5px] rounded-md left-2/4 top-[125%]">Upload</span> */}
        </div>
      )}
      <SignIn user={user} />
    </nav>
  );
}
