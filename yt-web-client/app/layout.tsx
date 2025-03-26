import type { Metadata } from "next";
import './globals.css'
import Navbar from "./navbar/navbar";


export const metadata: Metadata = {
  title: "Yotube",
  description: "Youtube Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body
        className=""
      >
        <div className="flex flex-col min-h-[99.4vh]">
        <Navbar/>
        <main style={{ flex: 1 }}>
        {children}
        </main>
        </div>
      </body>
    </html>
  );
}
