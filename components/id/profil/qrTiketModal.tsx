"use client";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { Tiket } from "@/components/types/tiket";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode"

export default function QrTiketModal({ tiketData }: { tiketData: Tiket }) {
  const [src, setSrc] = useState("");
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
    if (tiketData?.order_id) {
      generateQRCode();
    } 
  }, [tiketData]);

  const generateQRCode = () => {
    /* const baseURL = process.env.NEXT_PUBLIC_QR_API;
    const url = `${baseURL}?size=150x150&data=${tiketData.email}`;
    setSrc(url); */

    const basePath = process.env.NEXT_PUBLIC_BASEPATH
    QRCode.toDataURL(`${basePath}/tiket/invoice?orderId=${tiketData?.order_id}`).then((val) => setSrc(val));
  };

  const mapStatusToDescription = (status: any) => {
    switch (status) {
      case "SETTLEMENT":
        return intl ? intl.profile.accountData.ticketTab.status.finish : "";
      case "PENDING":
        return intl ? intl.profile.accountData.ticketTab.status.pending : "";
      case "DENY":
        return intl ? intl.profile.accountData.ticketTab.status.deny : "";
      case "CANCEL":
        return intl ? intl.profile.accountData.ticketTab.status.cancel : "";
      case "EXPIRE":
        return intl ? intl.profile.accountData.ticketTab.status.expire : "";
      case "REFUND":
        return intl ? intl.profile.accountData.ticketTab.status.refund : "";
      case "AUTHORIZE":
        return intl ? intl.profile.accountData.ticketTab.status.authorize : "";
      default:
        return intl ? intl.profile.accountData.ticketTab.status.unknown : "";
    }
  };

  return (
    <>
      <dialog id="detail_tiket_modal" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="mb-4 text-center text-2xl font-bold text-black-2 ">
            {intl ? intl.profile.accountData.ticketTab.detailTitle : ""}
          </h3>
          <label className="form-control mb-4 w-full ">
            <span className="label-text font-bold">
              {intl ? intl.profile.accountData.ticketTab.transactionIdText : ""}
            </span>
            <p className="text-lg">{tiketData?.transaction_id}</p>
          </label>
          <div className="flex flex-row items-start justify-between">
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">
                {intl
                  ? intl.profile.accountData.ticketTab.modal.quantityText
                  : ""}
              </span>
              <p className="text-lg">{tiketData?.quantity}</p>
            </label>
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">
                {intl
                  ? intl.profile.accountData.ticketTab.modal.statusText
                  : ""}
              </span>
              <p
                className={`text-lg font-bold ${
                  tiketData?.status === "SETTLEMENT"
                    ? "text-primary"
                    : tiketData?.status === "PENDING"
                    ? "text-info"
                    : "text-error"
                }`}
              >
                {mapStatusToDescription(tiketData?.status)}
              </p>
            </label>
          </div>
          <label className="form-control mb-4 ">
            <span className="label-text font-bold ">
              {intl ? intl.profile.accountData.ticketTab.modal.qrText : ""}
            </span>
            <div className="flex justify-center">
                <Image
                src={
                    src
                    ? src
                    : "https://placehold.jp/120/EEEEEE/D0D0D0/400x400.png?text=No+Image"
                }
                width={250}
                height={250}
                alt="QR Code Ticket"
                />
            </div>
            <span className="label-text-alt">
              <span className="text-red-500">*</span>
              {intl
                ? intl.profile.accountData.ticketTab.modal.qrMessageText
                : ""}
            </span>
          </label>
        </div>
      </dialog>
    </>
  );
}
