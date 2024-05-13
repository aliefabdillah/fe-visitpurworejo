import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface paginationProps {
  currentPage?: number;
  totalPages?: number;
  handlePageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: paginationProps) {
  const handleButtonClick = (page: number) => {
    handlePageChange?.(page);
  };

  return (
    <div className="flex flex-row gap-8 mt-10 items-center justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => handleButtonClick(currentPage! - 1)}
        className="
          btn btn-md 2xl:btn-lg
          rounded-lg 
          bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500
          focus:outline-none
          text-white font-bold text-sm md:text-md lg:text-lg xl:text-xl
        "
      >
        <ChevronLeftIcon fontSize="large" sx={{ color: "#FFFFFF" }} />
        Prev
      </button>
      <p className="text-lg">
        {currentPage} of {totalPages}
      </p>
      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handleButtonClick(currentPage! + 1)}
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
        <ChevronRightIcon fontSize="large" sx={{ color: "#FFFFFF" }} />
      </button>
    </div>
  );
}
