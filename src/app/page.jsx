"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import utils from "../utils";

export default function Index() {
  const router = useRouter();

  if (utils.isClient()) {
    if (useSearchParams().get("code"))
      axios
        .get(`/api/auth/login/${useSearchParams().get("code")}`)
        .then((response) => {
          if (response.status == 200) router.push("/dashboard");
          else router.push("/");
        });
  }

  function redirectGithubLogin() {
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&state=${process.env.NEXT_PUBLIC_GITHUB_STATE}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=read:user,user:email,read:org,repo`;
  }

  return (
    <main>
      <div className="grid place-items-center items-center justify-center h-screen">
        <div className="grid place-items-center -translate-y-16">
          <Image
            src="/icons/dark.png"
            alt="App Logo"
            className="mb-10 w-96"
            width={1920}
            height={1080}
            priority
          />
          <button
            className="bg-accent text-black dark:bg-accent bg-opacity-90 hover:brightness-95 p-3 ps-5 pe-5 rounded-lg dark:text-white"
            onClick={redirectGithubLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-github inline-flex"
              viewBox="0 0 17 17"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="ms-2">Login with GitHub</span>
          </button>
        </div>
      </div>
    </main>
  );
}
