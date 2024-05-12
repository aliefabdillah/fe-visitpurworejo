import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from "next/link";

export default function UlasanAccount() {
  return (
    <div className="my-6 shadow-2xl p-8 rounded-lg">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row items-center gap-3">
          <p className="text-4xl font-extrabold">Nama Wisata</p>
          <RemoveIcon/>
          <p className="text-2xl">50 Comments</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <p className="text-2xl font-bold">John Doe</p>
              <RemoveIcon/>
              <p className="text-xl">dd/mm/yyyy</p>
            </div>
            <p className="line-clamp-3 lg:line-clamp-none">Lorem ipsum dolor sit amet consectetur. Congue id arcu neque bibendum. Integer arcu aliquam rutrum vitae et libero cursus leo. Nulla neque mattis urna ultrices lobortis auctor. Id et neque hendrerit volutpat dictum molestie quam.</p>
            <Link href="/destinasi/Lorem-Ipsum"> 
              <button className="w-fit font-extralight">
                <ChevronRightIcon/>
                Lihat Ulasan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
