/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Cta() {
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
      <div className="absolute inset-0 w-full h-full object-cover bg-black opacity-35"/>
      <div className="relative z-10 flex flex-row items-center px-12 lg:px-24">
        <p
          className="
          text-white font-extrabold 
            text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl
            py-8 2xl:p-10 
            leading-snug xl:leading-tight 2xl:leading-normal
          "
        >
          Bagikan Pengalamanmu dan Dapatkan Hadiah Menarik
        </p>
        <a href="/" className="flex justify-center w-2/5">
          <button
            className="
              w-full
              btn-md 2xl:btn-lg
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
            "
          >
            COBA SEKARANG!
          </button>
        </a>
      </div>
    </div>
  );
}
