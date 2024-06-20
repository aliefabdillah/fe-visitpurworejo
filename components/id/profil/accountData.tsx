/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import WisataFavorit from "./wisataFavorit";
import UlasanAccount from "./ulasanAccount";
import ArtikelAccount from "./artikelAccount";
import Divider15 from "../divider/divider15";
import TukarPoin from "./tukarPoin";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import TiketAccount from "./tiketAccount";

export default function AccountData() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(0);

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
    if (tab === "artikel") {
      setActiveTab(2);
    } else if (tab === "tukarPoin") {
      setActiveTab(3);
    } else if (tab === "ulasan") {
      setActiveTab(1);
    } else if (tab === "tiket") {
      setActiveTab(4);
    } else {
      setActiveTab(0);
    }
  }, [tab]);

  const handleTabClick = (index: number, tabName: string) => {
    setActiveTab(index);
    router.push(`?tab=${tabName}`);
  };

  return (
    <div role="tablist" className="tabs tabs-xs md:tabs-md xl:tabs-lg">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label={intl ? intl.profile.accountData.favoriteTab.title : ""}
        checked={activeTab === 0}
        onChange={() => handleTabClick(0, "wisataFavorit")}
      />
      <div role="tabpanel" className="tab-content">
        <WisataFavorit />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label={intl ? intl.profile.accountData.reviewTab.title : ""}
        checked={activeTab === 1}
        onChange={() => handleTabClick(1, "ulasan")}
      />
      <div role="tabpanel" className="tab-content">
        <UlasanAccount />
        <Divider15 />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label={intl ? intl.profile.accountData.articleTab.title : ""}
        checked={activeTab === 2}
        onChange={() => handleTabClick(2, "artikel")}
      />
      <div role="tabpanel" className="tab-content">
        <ArtikelAccount />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label={intl ? intl.profile.accountData.redeemTab.title : ""}
        checked={activeTab === 3}
        onChange={() => handleTabClick(3, "tukarPoin")}
      />
      <div role="tabpanel" className="tab-content">
        <TukarPoin />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label={intl ? intl.profile.accountData.ticketTab.title : ""}
        checked={activeTab === 4}
        onChange={() => handleTabClick(4, "tiket")}
      />
      <div role="tabpanel" className="tab-content">
        {/* <TukarPoin /> */}
        <TiketAccount/>
      </div>
    </div>
  );
}
