"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Locale, getDictionary } from "../dictionaries/dictionaries";

export default function EmptyData({ halaman }: { halaman: string }) {
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
    <div className="mb-4">
      <p className="text-center text-2xl font-medium text-stone-400">
        {halaman} {intl ? intl.emptyData.text : ""}
      </p>
    </div>
  );
}
