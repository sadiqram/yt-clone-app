import type { Metadata } from "next";

import Navbar from "./navbar/navbar";


export const metadata: Metadata = {
  title: "Yotube",
  description: "Youtube Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans bg-white text-black dark:bg-black dark:text-white`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
