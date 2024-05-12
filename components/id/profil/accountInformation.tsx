import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";

export default function AccountInformation() {
  const date = new Date();
  const hour = date.getHours();
  let greeting;

  if (hour < 12) {
    greeting = 'Selamat Pagi';
  } else if (hour < 18) {
    greeting = 'Selamat Siang';
  } else if (hour < 20) {
    greeting = 'Selamat Sore';
  } else {
    greeting = 'Selamat Malam';
  }

  return (
    <div className="my-8 flex flex-row items-center gap-4">
      <AccountCircleIcon sx={{ fontSize: 200, color: "gray" }} />
      <div className="flex flex-col w-full">
        <div className="
          flex flex-col md:flex-row 
          justify-between md:items-center
          mb-4 md:mb-7">
          <h1 className="
            text-primary text-3xl xl:text-5xl 
            font-extrabold
            mb-2 md:mb-0
            "
          >
              {`${greeting}`}, John Doe
          </h1>
          <p className="font-medium text-xl">Point: 120 | Ulasan 100</p>
        </div>
        <div className="
          flex flex-col md:flex-row 
          gap-5 md:gap-0
          justify-between"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl">Profil kamu belum lengkap nih!</p>
            <div className="font-bold text-xl">
              <progress
                className="progress progress-primary w-4/5 md:w-56 h-4 mr-4"
                value="90"
                max="100"
              ></progress>
              90%
            </div>
          </div>
          <Link href="/profil/edit-profil/aliefma">
            <button
              className="
              w-full md:w-fit
              btn
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-xl"
            >
              Edit Profil
              <ArrowForwardIcon/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
