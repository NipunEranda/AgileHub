import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AgileHub",
  description: "Project management system",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className="bg-zinc-50 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 h-screen"
    >
      <body className={inter.className}>
        <div
          id="loading-screen"
          className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-40 min-h-full z-10 hidden"
        >
          <div className="m-auto border-neutral-800 dark:border-neutral-300 h-20 w-20 animate-spin rounded-full border-x-8 absolute bottom-0 left-0 right-0 mb-32"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
