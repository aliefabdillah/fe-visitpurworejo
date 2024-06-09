"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";

export default function PaymentError() {
  const lang = Cookies.get("lang");

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="p-8 modal-box outline-double outline-gray-200 flex flex-col items-center">
          <svg
            className="w-48 h-48 fill-error text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clip-rule="evenodd"
            />
          </svg>

          <h3 className="mb-4 text-center text-2xl font-medium text-black-2">
            Payment error. Go to the{" "}
            <Link
              className="text-primary underline hover:font-bold"
              href={{
                pathname: "/profil",
                query: {
                  lang: lang ? lang : "id",
                  tab: "tiket",
                  status: "DENY",
                },
              }}
            >
              profile
            </Link>{" "}
            page to see payment history orcontact customer support for
            assistance.
          </h3>
        </div>
      </div>
    </>
  );
}
