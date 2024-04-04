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
        </button>
      </div>
    </div>
  );
}
