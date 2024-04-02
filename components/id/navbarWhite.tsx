/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Profile from "./navbar/profile";
import { RESPONSIVE_WIDTH } from "@/app/constants";

export default function NavbarWhite() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isNotTop, setIsNotTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsNotTop(currentScrollPos == 0) 
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  /* useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []) */

  return (
    <div className={`
      fixed top-0
      navbar 
      flex flex-row items-center justify-center
      z-50
      transition-all duration-300 ease-in-out
      ${visible ? 'opacity-100' : 'opacity-0 -translate-y-16'}
      ${isNotTop ? '': 'bg-white shadow-lg'}
    `}>
      <div className={`${RESPONSIVE_WIDTH}`}>
        <div className="navbar-start flex items-center justify-between w-full lg:w-auto">
          <div className="items-start dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="primary"
                viewBox="0 0 24 24"
                stroke="#597e52"
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
                <a className="active:!bg-primary">Bahasa</a>
                <ul className="p-2">
                  <li>
                    <a className="active:!bg-primary">Indonesia</a>
                  </li>
                  <li>
                    <a className="active:!bg-primary">English</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/id/destinasi" className="active:!bg-primary">Destinasi</a>
              </li>
              <li>
                <a href="/id/akomodasi" className="active:!bg-primary">Akomodasi</a>
              </li>
              <li>
                <a href="/id/kuliner" className="active:!bg-primary">Kuliner</a>
              </li>
              <li>
                <a href="/id/artikel" className="active:!bg-primary">Artikel</a>
              </li>
              <li>
                <a href="/id/tentang-kami" className="active:!bg-primary">Tentang Kami</a>
              </li>
            </ul>
          </div>
          <Link href="/id/home" passHref>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_green-2.svg"
              alt="Visit Purworejo Logo"
              className="h-14"
            />
          </Link>
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => (document.getElementById("search_modal_sm")! as HTMLDialogElement).showModal()}
          >
            <MagnifyingGlassIcon className="mx-4 lg:hidden h-5 w-5 fill-primary" />
          </button>
          <dialog id="search_modal_sm" className="modal modal-middle">
            <div className="modal-box">
              <h3 className="text-lg text-center mb-4 font-bold">Cari Wisata</h3>
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
              <a href="/id/destinasi" className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                Destinasi
              </a>
            </li>
            <li>
              <a href="/id/akomodasi" className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                Akomodasi
              </a>
            </li>
            <li>
              <a href="/id/kuliner" className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                Kuliner
              </a>
            </li>
            <li>
              <a href="/id/artikel" className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                Artikel
              </a>
            </li>
            <li>
              <a href="/id/tentang-kami" className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                Tentang Kami
              </a>
            </li>
            <li>
              <details>
                <summary className="text-[#1E1E1E] hover:!bg-primary hover:!text-white">
                  Bahasa
                </summary>
                <ul className="p-2">
                  <li>
                    <a className="active:!bg-primary">Indonesia</a>
                  </li>
                  <li>
                    <a className="active:!bg-primary">Inggris</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden mx-4 lg:flex w-fit ">
          <button
            className="btn btn-circle bg-transparent border-none hover:bg-primary"
            onClick={() => (document.getElementById("search_modal")! as HTMLDialogElement).showModal()}
          >
            <MagnifyingGlassIcon className="h-5 w-5 fill-primary hover:fill-white" />
          </button>
          <dialog id="search_modal" className="modal modal-middle">
            <div className="modal-box">
              <h3 className="text-lg text-center mb-4 font-bold">Cari Wisata</h3>
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
        <Profile />
      </div>
    </div>
  );
}
