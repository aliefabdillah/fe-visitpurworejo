"use client"
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";

export default function PaymentDone() {
  const lang = Cookies.get("lang");
  
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="p-8 modal-box outline-double outline-gray-200 flex flex-col items-center">
          <svg
            className="h-48 w-48 fill-primary dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill=""
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
            />
          </svg>
          <h3 className="mb-4 text-center text-2xl font-medium text-black-2">
            Payment successful. Go to the{" "}
            <Link
              className="text-primary underline hover:font-bold"
              href={{
                pathname: "/profil",
                query: { lang: lang ? lang : "id", tab: "tiket", status: "SETTLEMENT" },
              }}
            >
              profile
            </Link>{" "}
            page to view your ticket.
          </h3>
        </div>
      </div>
    </>
  );
}
