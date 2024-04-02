/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

export default function CeritaKamiCard() {
  return (
    <div className="card lg:card-side bg-primary shadow-xl cursor-pointer">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Album"
          className="h-full w-full"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title text-2xl">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app. asdasdasd asdasdasd</p>
        <div className="flex flex-wrap sm:flex-nowrap flex-row items-center mt-4 2xl:mt-0">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt=""/>
            </div>
          </div>
          <p className="ml-4 font-extrabold">
            Oleh John Doe<br/>
            Nevada
          </p>
        </div>
      </div>
    </div>
  );
}
