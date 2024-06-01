"use client";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchModal() {
  const [searchValue, setSearchValue] = useState("");
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

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <dialog id="search_modal" className="modal modal-middle">
      <div className="modal-box">
        <h3 className="text-lg text-center mb-4 font-bold">{intl ? intl.searchModal.title : ""}</h3>
        <input
          className="input input-bordered w-10/12 focus:!outline-secondary"
          placeholder="Nama Wisata"
          onChange={handleSearchValue}
        />
        <Link
          onClick={() => (document.getElementById("search_modal")! as HTMLDialogElement).close()}
          href={{ pathname: "/wisata", query: {search: searchValue} }}
          className="btn w-2/12 bg-primary text-white hover:bg-neutral"
        >
          {intl ? intl.searchModal.buttonText : ""}
        </Link>
      </div>
      <form method="dialog" className="modal-backdrop">
        {/* if there is a button, it will close the modal */}
        <button>{intl ? intl.searchModal.closeText : ""}</button>
      </form>
    </dialog>
  );
}
