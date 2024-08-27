"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCookie("user"));
  }, []);

  return (
    <html
      lang="en"
      className="bg-zinc-50 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 h-screen"
    >
      <head>
        <title>AgileHub</title>
      </head>
      <body className={inter.className}>
        <div
          id="loading-screen"
          className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-40 min-h-full z-10 hidden"
        >
          <div className="m-auto border-neutral-800 dark:border-neutral-300 h-20 w-20 animate-spin rounded-full border-x-8 absolute bottom-0 left-0 right-0 mb-32"></div>
        </div>
        {user && <Header />}
        {children}
      </body>
    </html>
  );
}
