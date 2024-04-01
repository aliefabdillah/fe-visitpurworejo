import React from "react";

export default function CtaWide() {
  return (
    <div
      className="hero h-full mt-10"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503965830912-6d7b07921cd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-50 p-6 flex justify-center">
        <div className="hero-content text-center text-neutral-content">
          <div className="mt-10 max-w-md lg:max-w-lg xl:max-w-5xl 2xl:max-w-6xl">
            <h1 className="mb-4 md:mb-8 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            Ayo Dapatkan Hadiah Menarik!
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-6 md:mb-12">
            Hanya dengan membagikan pengalaman, cerita, tips & trik selama berwisata di Kabupaten Purworejo
            </p>
            <a href="/">
              <button
                className="
                  mb-10
                  btn-sm xl:btn-md 2xl:btn-lg
                  rounded-lg 
                  bg-gradient-to-l from-accent from-10% to-secondary to-90%
                  hover:from-yellow-500 hover:to-orange-500
                  focus:outline-none
                  text-white font-medium"
              >
                Coba sekarang
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
