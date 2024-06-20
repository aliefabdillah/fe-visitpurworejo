"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";

export default function PaymentUnfinish() {
  const lang = Cookies.get("lang");

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="p-8 modal-box outline-double outline-gray-200 flex flex-col items-center">
          <svg
            className="h-48 w-48 fill-info dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
              clip-rule="evenodd"
            />
          </svg>

          <h3 className="mb-4 text-center text-2xl font-medium text-black-2">
            Payment incomplete. Go to the{" "}
            <Link
              className="text-primary underline hover:font-bold"
              href={{
                pathname: "/profil",
                query: {
                  lang: lang ? lang : "id",
                  tab: "tiket",
                  status: "PENDING",
                },
              }}
            >
              profile
            </Link>{" "}
            page to complete the payment process and receive your ticket.
          </h3>
        </div>
      </div>
    </>
  );
}
