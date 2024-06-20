/* eslint-disable @next/next/no-img-element */
'use client'
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { CeritaKamiProps } from "@/components/types/artikel";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CeritaKamiCard({
  ceritaData,
}: {
  ceritaData: CeritaKamiProps;
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
  
  return (
    <div className="card h-80 lg:card-side bg-primary shadow-xl cursor-pointer">
      <figure>
        <Image
          width={500}
          height={500}
          src={
            ceritaData.cover.url
              ? ceritaData.cover.url
              : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
          }
          alt="Cover"
          className="h-80 w-full"
        />
      </figure>
      <div className="card-body text-white w-2/3">
        <h2 className="card-title text-2xl">{ceritaData.title}</h2>
        <p className="line-clamp-5 break-words">
          {ceritaData.short_content}
        </p>
        <div className="flex flex-wrap sm:flex-nowrap flex-row items-center mt-4 2xl:mt-0">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <Image
                width={100}
                height={100}
                src={
                  ceritaData.user.img_profile
                    ? ceritaData.user.img_profile
                    : `https://avatar.iran.liara.run/username?username=${ceritaData.user.username}`
                }
                alt="Avatar"
              />
            </div>
          </div>
          <p className="ml-4 font-extrabold">
            {intl ? intl.card.byText : ""} {ceritaData.user.username}
            <br />
            {ceritaData.user.hometown ? ceritaData.user.hometown : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
