"use client";
import React, { useEffect, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function DeactivateAccountModal() {
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
    <dialog id="deactivate_account_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-4">
          {intl ? intl.profile.accountSettings.deactiveModal.title : ""}
        </h3>
        <div
          role="alert"
          className="alert bg-secondary bg-opacity-30 mb-4 rounded-none"
        >
          <WarningAmberIcon />
          <span>
            <b>
              {intl
                ? intl.profile.accountSettings.deactiveModal.warningText
                : ""}
            </b>
            :{" "}
            {intl
              ? intl.profile.accountSettings.deactiveModal.warningMessage
              : ""}
          </span>
        </div>
        <p className="mb-4">
          {intl ? intl.profile.accountSettings.deactiveModal.contentText : ""}
        </p>
        <form>
          <label className="form-control w-full">
            <span className="label-text text-error">
              {intl
                ? intl.profile.accountSettings.deactiveModal.labelConfirmField
                : ""}
            </span>
            <input
              type="text"
              placeholder="JohnDoe"
              className="input input-bordered w-full"
              required
            />
          </label>
          <button
            className="
              my-4
              w-full
              btn
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-lg"
          >
            {intl
              ? intl.profile.accountSettings.deactiveModal.buttonText
              : ""}
          </button>
        </form>
      </div>
    </dialog>
  );
}
