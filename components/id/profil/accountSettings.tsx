"use client";
import React, { useEffect, useState } from "react";
import DeactivateAccountModal from "./deactivateAccountModal";
import DeleteAccountModal from "./deleteAccountModal";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function AccountSettings() {
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
    <div className="flex flex-col gap-5">
      <p className="text-4xl font-extrabold mb-4">
        {intl ? intl.profile.accountSettings.title : ""}
      </p>
      <div className="ml-10">
        <button
          onClick={() =>
            (
              document.getElementById(
                "deactivate_account_modal"
              )! as HTMLDialogElement
            ).showModal()
          }
        >
          <p className="text-2xl text-error font-extrabold">
            {intl ? intl.profile.accountSettings.deactiveButtonText : ""}
          </p>
        </button>
        <DeactivateAccountModal />
        <p className="text-lg">
          {intl ? intl.profile.accountSettings.deactiveLabel : ""}
        </p>
      </div>
      <div className="ml-10">
        <button
          onClick={() =>
            (
              document.getElementById(
                "delete_account_modal"
              )! as HTMLDialogElement
            ).showModal()
          }
        >
          <p className="text-2xl text-error font-extrabold">
            {intl ? intl.profile.accountSettings.deleteButtonText : ""}
          </p>
        </button>
        <DeleteAccountModal />
        <p className="text-lg">
          {intl ? intl.profile.accountSettings.deleteLabel : ""}
        </p>
      </div>
    </div>
  );
}
