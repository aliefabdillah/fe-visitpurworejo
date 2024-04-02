import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
        <ChevronLeftIcon fontSize="large" sx={{ color: "#FFFFFF"}}/>
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
        Next
        <ChevronRightIcon fontSize="large" sx={{ color: "#FFFFFF"}}/>
      </button>
    </div>
  );
}
