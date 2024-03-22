/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function NavbarWhite() {
  return (
    <div className="navbar bg-transparent">
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
              <a>Bahasa</a>
              <ul className="p-2">
                <li>
                  <a>Indonesia</a>
                </li>
                <li>
                  <a>English</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Destinasi</a>
            </li>
            <li>
              <a>Akomodasi</a>
            </li>
            <li>
              <a>Kuliner</a>
            </li>
            <li>
              <a>Artikel</a>
            </li>
            <li>
              <a>Tentang Kami</a>
            </li>
          </ul>
        </div>
        <Link className="mx-10" href="/id/home" passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_green-2.svg"
            alt="Visit Purworejo Logo"
            className="h-14"
          />
        </Link>
        <button className="btn btn-ghost lg:hidden">
          <MagnifyingGlassIcon className="mx-4 lg:hidden h-5 w-5 fill-primary" />
        </button>
      </div>
      <div className="navbar-end w-full hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-gray-900">Destinasi</a>
          </li>
          <li>
            <a className="text-gray-900">Akomodasi</a>
          </li>
          <li>
            <a className="text-gray-900">Kuliner</a>
          </li>
          <li>
            <a className="text-gray-900">Artikel</a>
          </li>
          <li>
            <a className="text-gray-900">Tentang Kami</a>
          </li>
          <li>
            <details>
              <summary className="text-gray-900">Bahasa</summary>
              <ul className="p-2">
                <li>
                  <a>Indonesia</a>
                </li>
                <li>
                  <a>Inggris</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden mx-4 lg:flex w-fit ">
        <button className="btn btn-ghost">
          <MagnifyingGlassIcon className="h-5 w-5 fill-primary" />
        </button>
      </div>
      <div className="flex lg:mr-8">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Profil
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
                </svg>
                10 Points
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Keluar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
