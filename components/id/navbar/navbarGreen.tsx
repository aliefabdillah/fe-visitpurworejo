/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Profile from "./profile";
import { RESPONSIVE_WIDTH } from "@/app/constants";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchModal from "./searchModal";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

export default function NavbarGreen() {
  const router = useRouter();
  const [isNotTop, setIsNotTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const searchParams = useSearchParams();
  const userSession = Cookies.get("session");
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsNotTop(currentScrollPos == 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLanguageClick = (language: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", language);
    router.push(`${window.location.pathname}?${params.toString()}`);
    Cookies.set('lang', language, {
      expires: 1, // 1 day
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
    // window.location.reload();
  };

  return (
    <div
      className={`
      fixed top-0
      bg-gradient-to-b from-primary from-10% to-transparent
      navbar 
      flex flex-row items-center justify-center
      z-50
      transition-all duration-300 ease-in-out
      ${visible ? "opacity-100" : "opacity-0 -translate-y-16"}
      ${isNotTop ? "" : "bg-primary shadow-lg"}
    `}
    >
      <div className={`${RESPONSIVE_WIDTH}`}>
        <div className="navbar-start flex items-center justify-between w-full lg:w-auto">
          <div className="items-start dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="active:!bg-primary">
                  {intl ? intl.navbar.language : ""}
                </p>
                <ul className="p-2">
                  <li onClick={() => handleLanguageClick("id")}>
                    <p className="active:!bg-primary">
                      {intl ? intl.navbar.languageItem.id : ""}
                    </p>
                  </li>
                  <li onClick={() => handleLanguageClick("en")}>
                    <p className="active:!bg-primary">
                      {intl ? intl.navbar.languageItem.en : ""}
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/destinasi" className="active:!bg-primary">
                  {intl ? intl.destination.title : ""}
                </Link>
              </li>
              <li>
                <Link href="/akomodasi" className="active:!bg-primary">
                  {intl ? intl.accomodation.title : ""}
                </Link>
              </li>
              <li>
                <Link href="/kuliner" className="active:!bg-primary">
                  {intl ? intl.culinary.title : ""}
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="active:!bg-primary">
                  {intl ? intl.article.title : ""}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="active:!bg-primary">
                  {intl ? intl.about.title : ""}
                </Link>
              </li>
            </ul>
          </div>
          <Link href={{ pathname: "/home", query: {lang: lang}}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              width={140}
              height={140}
              src="/logo_white-2.svg"
              alt="Visit Purworejo Logo"
              className="h-14"
            />
          </Link>
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() =>
              (
                document.getElementById("search_modal")! as HTMLDialogElement
              ).showModal()
            }
          >
            <MagnifyingGlassIcon className="mx-4 lg:hidden h-5 w-5 fill-white" />
          </button>
          <SearchModal />
        </div>
        <div className="navbar-end w-full hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <Link href="/destinasi" className="text-white focus:!text-white">
                {intl ? intl.destination.title : ""}
              </Link>
            </li>
            <li>
              <Link href="/akomodasi" className="text-white focus:!text-white">
                {intl ? intl.accomodation.title : ""}
              </Link>
            </li>
            <li>
              <Link href="/kuliner" className="text-white focus:!text-white">
                {intl ? intl.culinary.title : ""}
              </Link>
            </li>
            <li>
              <Link href="/artikel" className="text-white focus:!text-white">
                {intl ? intl.article.title : ""}
              </Link>
            </li>
            <li>
              <Link
                href="/tentang-kami"
                className="text-white focus:!text-white"
              >
                {intl ? intl.about.title : ""}
              </Link>
            </li>
            <li>
              <details>
                <summary className="text-white">
                  {intl ? intl.navbar.language : ""}
                </summary>
                <ul className="p-2">
                  <li onClick={() => handleLanguageClick("id")}>
                    <p className="active:!bg-primary">
                      {intl ? intl.navbar.languageItem.id : ""}
                    </p>
                  </li>
                  <li onClick={() => handleLanguageClick("en")}>
                    <p className="active:!bg-primary">
                      {intl ? intl.navbar.languageItem.en : ""}
                    </p>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden mx-4 lg:flex w-fit ">
          <button
            className="btn btn-ghost"
            onClick={() =>
              (
                document.getElementById("search_modal")! as HTMLDialogElement
              ).showModal()
            }
          >
            <MagnifyingGlassIcon className="h-5 w-5 fill-white" />
          </button>
          <SearchModal />
        </div>
        <Profile color="fill-white" />
      </div>
    </div>
  );
}
