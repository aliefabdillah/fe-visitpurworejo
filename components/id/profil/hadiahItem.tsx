import React, { useState } from "react";
import Image from "next/image";
import { Hadiah } from "@/components/types/hadiah";
import TukarPoinmodal from "./tukarPoinmodal";

export default function HadiahItem({
  hadiah,
  getSelectedHadiah,
}: {
  hadiah: Hadiah;
  getSelectedHadiah: (hadiah: Hadiah) => void;
}) {
  const handleTukar = (hadiahData: Hadiah) => {
    getSelectedHadiah(hadiahData);
    (document.getElementById("tukar_poin_modal") as HTMLDialogElement).showModal();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center rounded-lg shadow-2xl my-4 p-4 gap-5">
      <Image
        width={1200}
        height={1200}
        src={
          hadiah.image
            ? hadiah.image
            : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
        }
        alt="Article Image"
        className="w-auto lg:w-2/6"
      />
      <div className="flex flex-col gap-2 w-2/3 mr-6">
        <h1 className="font-bold text-2xl">{hadiah.name}</h1>
        <p className="text-2xl">Point penukaran: {hadiah.redeem_points}</p>
        <p className="text-lg">{hadiah.description}</p>
      </div>
      <button
        onClick={() => handleTukar(hadiah)}
        className="btn btn-primary w-full lg:w-fit rounded-lg focus:outline-none text-white font-bold text-xs lg:text-md xl:text-xl"
      >
        Tukar
      </button>
    </div>
  );
}
