'use client'
import React from "react";
import DeactivateAccountModal from "./deactivateAccountModal";
import DeleteAccountModal from "./deleteAccountModal";

export default function AccountSettings() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-4xl font-extrabold mb-4">Pengaturan Akun</p>
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
            Non-aktifkan Akun
          </p>
        </button>
        <DeactivateAccountModal/>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur. Auctor ullamcorper odio nullam
          mattis pharetra at malesuada enim.
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
          <p className="text-2xl text-error font-extrabold">Hapus Akun</p>
        </button>
        <DeleteAccountModal/>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur. Auctor ullamcorper odio nullam
          mattis pharetra at malesuada enim.
        </p>
      </div>
    </div>
  );
}
