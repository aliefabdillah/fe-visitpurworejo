import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Hadiah } from "@/components/types/hadiah";
import TukarPoinmodal from "./tukarPoinmodal";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function HadiahItem({
  hadiah,
  getSelectedHadiah,
}: {
  hadiah: Hadiah;
  getSelectedHadiah: (hadiah: Hadiah) => void;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  const handleTukar = (hadiahData: Hadiah) => {
    getSelectedHadiah(hadiahData);
    (
      document.getElementById("tukar_poin_modal") as HTMLDialogElement
    ).showModal();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center rounded-lg shadow-2xl my-4 p-6 gap-5">
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
        <p className="text-lg">
          {intl ? intl.profile.accountData.redeemTab.itemPointText : ""}:{" "}
          <i>{hadiah.redeem_points}</i>
        </p>
        <p className="text-lg">
          {intl ? intl.profile.accountData.redeemTab.stockGiftText : ""}:{" "}
          <i>{hadiah.stock}</i>
        </p>
        <p className="text-lg">
          {intl ? intl.profile.accountData.redeemTab.locationRedeem : ""}:{" "}
          <b>{hadiah.lokasi_redeem}</b>
        </p>
        <p className="text-md">{hadiah.description}</p>
      </div>
      <button
        onClick={() => handleTukar(hadiah)}
        className={`btn ${hadiah.stock == 0 ? `btn-disabled`  : `btn-primary`} w-full lg:w-fit lg:mr-4 rounded-lg focus:outline-none text-white font-bold text-xs lg:text-md xl:text-xl`}
      >
        {intl ? intl.profile.accountData.redeemTab.buttonText : ""}
      </button>
    </div>
  );
}
