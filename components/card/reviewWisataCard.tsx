/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function ReviewWisataCard() {
  return (
    <div className="card w-full bg-primary shadow-2xl">
      <div className="card-body text-white text-ellipsis">
        <h2 className="card-title text-2xl">New album is released!</h2>
        <p className="line-clamp-4 xl:line-clamp-none">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        <div className="flex flex-wrap md:flex-nowrap flex-row items-center mt-7">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt=""/>
            </div>
          </div>
          <p className="ml-4 text-xl font-extrabold">
            By John Doe<br/>
            Nevada
          </p>
        </div>
      </div>
    </div>
  );
}
