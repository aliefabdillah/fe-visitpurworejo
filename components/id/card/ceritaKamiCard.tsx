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
    <div className="card h-full md:h-124 lg:h-112 xl:h-80 xl:card-side bg-primary shadow-xl cursor-pointer">
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
      <div className="card-body text-white w-full lg:w-4/">
        <h2 className="card-title text-xl lg:text-2xl line-clamp-3 break-words lg:line-clamp-2 lg:break-words">{ceritaData.title}</h2>
        <p className="line-clamp-5 md:line-clamp-none lg:line-clamp-5 xl:line-clamp-4 break-words">
          {ceritaData.short_content}
        </p>
        <div className="flex flex-wrap sm:flex-nowrap flex-row items-center justify-center md:justify-normal mt-4 2xl:mt-0">
          <div className="avatar">
            <div className="w-10 lg:w-16 rounded-full">
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
          <p className="mt-2 md:mt-0 text-center md:text-left md:ml-4 font-extrabold">
            {intl ? intl.card.byText : ""} {ceritaData.user.username}
            <br />
            {ceritaData.user.hometown ? ceritaData.user.hometown : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
