"use client";
import React, { useEffect, useState } from "react";

import EditProfilForm from "./editProfilForm";
import Divider15 from "../divider/divider15";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
export default function EditProfil() {
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
    <div className="flex flex-col gap-4">
      <p className="font-extrabold text-5xl">
        {intl ? intl.profile.editProfile.title : ""}
      </p>
      <p className="text-xl">{intl ? intl.profile.editProfile.intro : ""}</p>
      <EditProfilForm />
    </div>
  );
}
