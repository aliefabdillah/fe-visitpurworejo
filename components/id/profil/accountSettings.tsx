"use client";
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
        <DeactivateAccountModal />
        <p className="text-lg">
          Nonaktifkan akun Anda untuk sementara atau permanen jika Anda ingin
          beristirahat dari platform kami.
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
        <DeleteAccountModal />
        <p className="text-lg">
          Hapus Akun memungkinkan Anda untuk menghapus akun secara
          permanen dari platform kami.
        </p>
      </div>
    </div>
  );
}
