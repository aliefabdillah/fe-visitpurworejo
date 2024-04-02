/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function ModalGallery() {
  return (
    <>
      <div className="modal-box p-0 max-w-130">
        {/* <h3 className="font-bold text-lg">Hello!</h3> */}
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" 
            alt="Album"
            className="basis-6/12 object-cover md:w-full"
          />
          <div className="flex-col w-full p-8 basis-6/12">
            <p className="mb-3 text-4xl font-extrabold">Nama Wisata</p>
            <p className="mb-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            <a href="/id/destinasi/Nama-Wisata">
              <button className="btn btn-sm btn-secondary text-white w-full">
                Lihat Wisata
              </button>
            </a>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
      {/* if there is a button, it will close the modal */}
      <button>Close</button>
    </form>
    </>
  );
}
