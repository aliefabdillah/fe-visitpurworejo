/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function WisataList({items}:{items?:string[]}) {
  let itemsLength = 3
  if (items) {
    itemsLength = items.length
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: itemsLength }).map((_, index) => (
        <div key={index} className="relative overflow-hidden group rounded-lg">
          <a href="/id/destinasi/Lorem-Ipsum">
            <img
              className="
                h-auto
                max-w-full object-cover
                transition-transform transform-gpu duration-300 
                scale-100 group-hover:scale-110 group-hover:rounded-lg cursor-pointer"
              src="https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent from-10% to-zinc-900 to-100%"></div>
            <div className="absolute bottom-0 flex items-end px-8 my-6">
              <div className="text-white text-start">
                <h1 className="
                  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                  font-extrabold mb-1">
                    Nama Wisata
                </h1>
                <h3 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">Lokasi</h3>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
  
}
