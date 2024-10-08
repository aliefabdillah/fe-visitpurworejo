/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function Cta() {
  const userSession = Cookies.get("session");
  const searchParams = useSearchParams();
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
    <div
      className="
        relative
        w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
        my-12
        rounded-lg
        bg-center bg-cover
      "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="rounded-lg absolute inset-0 w-full h-full object-cover bg-black opacity-35" />
      <div className="relative z-10 flex flex-col sm:flex-row items-center px-12 lg:px-24">
        <p
          className="
          text-white font-extrabold 
            text-center sm:text-left
            text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl
            py-8 2xl:p-10 
            leading-snug xl:leading-tight 2xl:leading-normal
          "
        >
          {intl ? intl.cta.smallMessage : ""}
        </p>
        <Link
          href={userSession ? `/profil?tab=artikel` : `/auth/login`}
          className="flex justify-center w-2/5"
        >
          <button
            className="
              w-full
              btn-md 2xl:btn-lg
              mb-4 sm:mb-0
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs md:text-md lg:text-lg xl:text-xl
            "
          >
            {intl ? intl.cta.buttonText : ""}
          </button>
        </Link>
      </div>
    </div>
  );
}
