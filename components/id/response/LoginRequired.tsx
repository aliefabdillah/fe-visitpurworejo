"use client";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginRequired() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang");
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

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
        {intl ? intl.loginRequired.text : ""}&nbsp;
        <Link className="font-bold underline" href={{ pathname: "/auth/login", query: { lang: langQuery } }}>
          {intl ? intl.loginRequired.buttonText : ""}
        </Link>
      </span>
    </div>
  );
}
