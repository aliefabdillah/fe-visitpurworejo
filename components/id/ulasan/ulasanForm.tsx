import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UlasanForm() {
  return (
    <div className="flex flex-col mt-8 gap-4">
      <div className="flex flex-row ">
        <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} />
        <textarea
          placeholder="Tulis Ulasan..."
          className="
            textarea textarea-bordered textarea-lg 
            w-full min-h-64
            ml-4 
            resize-none"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          className="
            btn
            rounded-lg 
            bg-gradient-to-l from-accent from-10% to-secondary to-90%
            hover:from-yellow-500 hover:to-orange-500
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-xl"
        >
          Comment
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
