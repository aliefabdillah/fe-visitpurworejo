"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function LoginRequired() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  return (
    <div role="alert" className={`alert alert-warning my-5 flex item-center justify-center`}>
      <svg
        className="w-10 h-10 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <span className="text-white text-2xl">
        Login terlebih dahulu untuk memberikan ulasan.&nbsp;
        <Link className="font-bold underline" href={{ pathname: "/auth/login", query: { lang: lang } }}>
          Login
        </Link>
      </span>
    </div>
  );
}
