/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

export default function ArtikelCreator() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap flex-row items-center">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="xs:ml-0 sm:ml-6">
        <p className="text-3xl font-extrabold">John Doe</p>
        <p className="font-normal">Day, dd/mm/yy</p>
      </div>
    </div>
  );
}
