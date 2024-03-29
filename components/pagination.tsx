import React from "react";

export default function Pagination() {
  return (
    <div className="flex flex-row gap-8 mt-10 items-center justify-center">
      <button
        className="
          btn btn-md 2xl:btn-lg
          rounded-lg 
          bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500
          focus:outline-none
          text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
        "
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
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
            d="m15 19-7-7 7-7"
          />
        </svg>
        Prev
      </button>
      <p className="text-lg">4 of 20</p>
      <button
        className="
          btn btn-md 2xl:btn-lg
          rounded-lg 
          bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500
          focus:outline-none
          text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
        "
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
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
            d="m9 5 7 7-7 7"
          />
        </svg>
        Next
      </button>
    </div>
  );
}
