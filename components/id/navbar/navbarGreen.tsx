/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Profile from "./profile";
import { RESPONSIVE_WIDTH } from "@/app/constants";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchModal from "./searchModal";

export default function NavbarGreen() {
  const [isNotTop, setIsNotTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  /*  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNotTop(true);
      } else {
        setIsNotTop(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []) */

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
                <p className="active:!bg-primary">Bahasa</p>
                <ul className="p-2">
                  <li>
                    <p className="active:!bg-primary">Indonesia</p>
                  </li>
                  <li>
                    <p className="active:!bg-primary">English</p>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/destinasi" className="active:!bg-primary">
                  Destinasi
                </Link>
              </li>
              <li>
                <Link href="/akomodasi" className="active:!bg-primary">
                  Akomodasi
                </Link>
              </li>
              <li>
                <Link href="/kuliner" className="active:!bg-primary">
                  Kuliner
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="active:!bg-primary">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="active:!bg-primary">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
          <Link className="" href="/home" passHref>
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
                document.getElementById("search_modal_sm")! as HTMLDialogElement
              ).showModal()
            }
          >
            <MagnifyingGlassIcon className="mx-4 lg:hidden h-5 w-5 fill-white" />
          </button>
          <dialog id="search_modal_sm" className="modal modal-middle">
            <div className="modal-box">
              <h3 className="text-lg text-center mb-4 font-bold">
                Cari Wisata
              </h3>
              <input
                className="input input-bordered w-10/12 focus:!outline-secondary"
                placeholder="Nama Wisata"
              />
              <button className="btn w-2/12 bg-primary text-white hover:bg-neutral">
                Cari
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              {/* if there is a button, it will close the modal */}
              <button>Close</button>
            </form>
          </dialog>
        </div>
        <div className="navbar-end w-full hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <Link href="/destinasi" className="text-white focus:!text-white">
                Destinasi
              </Link>
            </li>
            <li>
              <Link href="/akomodasi" className="text-white focus:!text-white">
                Akomodasi
              </Link>
            </li>
            <li>
              <Link href="/kuliner" className="text-white focus:!text-white">
                Kuliner
              </Link>
            </li>
            <li>
              <Link href="/artikel" className="text-white focus:!text-white">
                Artikel
              </Link>
            </li>
            <li>
              <Link
                href="/tentang-kami"
                className="text-white focus:!text-white"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <details>
                <summary className="text-white">Bahasa</summary>
                <ul className="p-2">
                  <li>
                    <p className="active:!bg-primary">Indonesia</p>
                  </li>
                  <li>
                    <p className="active:!bg-primary">Inggris</p>
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
          <SearchModal/>
        </div>
        <Profile color="fill-white"/>
      </div>
    </div>
  );
}
