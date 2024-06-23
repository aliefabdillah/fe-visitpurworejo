"use client";
import React, { useEffect, useState } from "react";
import UlasanForm from "./ulasanForm";
import UlasanList from "./ulasanList";
import { decryptUserId } from "@/components/lib/crypto";
import Cookies from "js-cookie";
import LoginRequired from "../response/LoginRequired";
import { useQuery } from "react-query";
import { ulasanService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function UlasanSection({
  slug,
  wisataId,
}: {
  slug: string;
  wisataId: number;
}) {
  const [idUser, setIdUser] = useState<number | null>(null);
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

  useEffect(() => {
    const handleCookiesChange = () => {
      const userSession = Cookies.get("id");
      setIdUser(userSession ? parseInt(userSession) : 0);
    };

    handleCookiesChange(); // Check cookies initially

    const interval = setInterval(() => {
      handleCookiesChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { error, data } = useQuery("total-ulasan", () =>
    ulasanService.geTotalUlasanWisata(slug)
  );

  return (
    <div className="my-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold">
          {intl ? intl.comment.title : ""} ({data?.data})
        </h1>
        <Link
          href={{
            pathname:
              "/artikel/pedoman-memberikan-ulasan-dan-komentar-di-visitpurworejo",
            query: {
              lang: lang ? lang : "id",
            },
          }}
        >
          <span className="hover:font-bold hover:underline">
          {intl ? intl.comment.guideText : ""} <HelpOutlineIcon sx={{ color: "#597e52" }}/>
          </span>
        </Link>
      </div>
      {idUser ? <UlasanForm wisataId={wisataId} /> : <LoginRequired />}

      <UlasanList slug={slug} userId={idUser ? idUser : 0} />
    </div>
  );
}
