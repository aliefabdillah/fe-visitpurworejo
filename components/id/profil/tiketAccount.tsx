import Loading from "@/components/Loader/Loading";
import { formatDate } from "@/components/lib/formatter";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EmptyData from "../EmptyData";
import ulasanAccount from "./ulasanAccount";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import { tiketService, ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Ulasan } from "@/components/types/ulasan";
import { Tiket } from "@/components/types/tiket";
import QrTiketModal from "./qrTiketModal";
import CancelModal from "./cancelModal";
import ToastError from "../response/ToastResponse";

export default function TiketAccount() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [statusValue, setStatusValue] = useState(status ? status : "PENDING");
  const [isLoading, setIsLoading] = useState(false);
  const [tiketAccountData, setTiketAccountData] = useState<Tiket[]>([]);
  const [modalTiketData, setModalTiketData] = useState<any>(null);
  const [cancelTransactionId, setCancelTransactionId] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

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
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await tiketService.getTiketByUser();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const tiketAccountResult: any[] = response.data;
      const formattedTiketAccountData: Tiket[] = await Promise.all(
        tiketAccountResult.map(async (tiketAccount) => {
          const status = await getStatusPayment(tiketAccount.order_id);
          return {
            id: tiketAccount.id,
            email: tiketAccount.email,
            name: tiketAccount.name,
            quantity: tiketAccount.quantity,
            payment_link: status.payment_link_url,
            total_pembayaran: tiketAccount.total_pembayaran,
            status:
              status.purchases[status.purchases.length - 1].payment_status,
            order_id: tiketAccount.order_id,
            transaction_id:
              status.purchases[status.purchases.length - 1].transaction_id,
            user: tiketAccount.user_id,
            wisata: tiketAccount.wisata_id,
          };
        })
      );
      setTiketAccountData(formattedTiketAccountData);
    }
    setIsLoading(false);
  };

  const getStatusPayment = async (orderId: string) => {
    const serverKey = process.env.MIDTRANS_SECRET; // Pastikan ini diatur dalam environment variables
    const encodedKey = Buffer.from(`${serverKey}:`).toString("base64");

    try {
      const response = await fetch(
        `https://api.sandbox.midtrans.com/v1/payment-links/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedKey}`,
          },
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        setError({
          message: "Get Ticket Payment Status Failed",
          name: "paymentStatusFailed",
          status: response.status.toString(),
        });
        setIsToastOpen(true);
        // throw new Error(`Error: ${response.status}`);
      }

      const paymentStatus = await response.json();
      return paymentStatus;
    } catch (error) {
      console.error("Failed to get payment status:", error);
      throw error;
    }
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

  const handleModalButton = (tiket: Tiket) => {
    setModalTiketData(tiket);
    (
      document.getElementById("detail_tiket_modal")! as HTMLDialogElement
    ).showModal();
  };

  const handleCancelButton = (orderId: string) => {
    setCancelTransactionId(orderId);
    (
      document.getElementById("cancel_tiket_modal")! as HTMLDialogElement
    ).showModal();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const dataToRender = tiketAccountData.length
    ? tiketAccountData.filter((tiket) => {
        return tiket.status
          ? tiket.status.toLowerCase().includes(statusValue.toLowerCase())
          : true;
      })
    : [];

  return (
    <>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <select
        className="select select-bordered w-fit text-lg mt-6 mb-2"
        defaultValue={statusValue}
        onChange={handleStatusChange}
      >
        <option value={"SETTLEMENT"}>
          {intl ? intl.profile.accountData.ticketTab.status.finish : ""}
        </option>
        <option value={"PENDING"}>
          {intl ? intl.profile.accountData.ticketTab.status.pending : ""}
        </option>
        <option value={"DENY"}>
          {intl ? intl.profile.accountData.ticketTab.status.deny : ""}
        </option>
        <option value={"CANCEL"}>
          {intl ? intl.profile.accountData.ticketTab.status.cancel : ""}
        </option>
        <option value={"EXPIRE"}>
          {intl ? intl.profile.accountData.ticketTab.status.expire : ""}
        </option>
        <option value={"REFUND"}>
          {intl ? intl.profile.accountData.ticketTab.status.refund : ""}
        </option>
        <option value={"AUTHORIZE"}>
          {intl ? intl.profile.accountData.ticketTab.status.authorize : ""}
        </option>
      </select>
      {isLoading ? (
        <div className="flex justify-center my-2">
          <Loading />
        </div>
      ) : dataToRender.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {dataToRender.map((tiket) => (
            <div
              key={tiket.id}
              className={`
                ${tiket.status === 'SETTLEMENT' ? 'h-80': 'h-60'}
                flex flex-col justify-center 
                my-4 
                shadow-2xl p-8 rounded-lg outline-double outline-stone-300`}
            >
              <p className="text-xl text-center lg:text-2xl xl:text-4xl font-extrabold mb-4">
                {intl ? intl.profile.accountData.ticketTab.title : ""}{" "}
                {tiket.wisata ? tiket.wisata.name : ""}
              </p>
              <div className="flex flex-col gap-3">
                <span className="text-xs text-center md:text-md">
                  {intl
                    ? intl.profile.accountData.ticketTab.transactionIdText
                    : ""}
                  &nbsp;
                  <b>{tiket.transaction_id}</b>
                </span>
                <div className="flex flex-col items-center justify-between gap-1">
                  <span className="text-md md:text-lg">
                    {intl
                      ? intl.profile.accountData.ticketTab.quantityItemText
                      : ""}{" "}
                    <b>{tiket.quantity}</b>
                  </span>
                  <span className="text-md md:text-lg">
                    <span
                      className={`font-bold ${
                        tiket.status === "SETTLEMENT"
                          ? "text-primary"
                          : tiket.status === "PENDING"
                          ? "text-info"
                          : "text-error"
                      }`}
                    >
                      {mapStatusToDescription(tiket.status)}
                    </span>
                  </span>
                </div>
                <div className="flex justify-center gap-3">
                  {tiket.status === "PENDING" ? (
                    <>
                      <button
                        className="btn btn-error text-white"
                        onClick={() =>
                          handleCancelButton(
                            tiket.transaction_id ? tiket.transaction_id : ""
                          )
                        }
                      >
                        {intl
                          ? intl.profile.accountData.ticketTab.cancelButtonText
                          : ""}
                      </button>
                      <Link href={tiket.payment_link ? tiket.payment_link : ""}>
                        <button className="btn btn-outline btn-primary text-white">
                          Bayar
                        </button>
                      </Link>
                    </>
                  ) : (
                    tiket.status === "SETTLEMENT" && (
                      <button
                        className="btn btn-info text-white"
                        onClick={() => handleModalButton(tiket)}
                      >
                        {intl
                          ? intl.profile.accountData.ticketTab.buttonModalText
                          : ""}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
          <QrTiketModal tiketData={modalTiketData!} />
          <CancelModal transactionId={cancelTransactionId} />
        </div>
      ) : (
        <EmptyData
          halaman={intl ? intl.profile.accountData.ticketTab.title : ""}
        />
      )}
    </>
  );
}
