"use client";
import { tiketService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import ToastError from "@/components/id/response/ToastResponse";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Tiket } from "@/components/types/tiket";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Invoice() {
  const [tiketInvoiceData, setTiketInvoiceData] = useState<Tiket>();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("lang");
  const orderId = searchParams.get("orderId");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  const loadData = async () => {
    if (!orderId) return;

    const response = await tiketService.getTiketByOrderId(orderId);

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const tiketInvoice = response.data;
      const status = await getStatusPayment(tiketInvoice.order_id);
      const formattedTiketInvoiceData: Tiket = {
        id: tiketInvoice.id,
        email: tiketInvoice.email,
        name: tiketInvoice.name,
        quantity: tiketInvoice.quantity,
        total_pembayaran: tiketInvoice.total_pembayaran,
        status: status.purchases[status.purchases.length - 1].payment_status,
        order_id: tiketInvoice.order_id,
        transaction_id:
          status.purchases[status.purchases.length - 1].transaction_id,
        user: tiketInvoice.user_id,
        wisata: tiketInvoice.wisata_id,
      };
      setTiketInvoiceData(formattedTiketInvoiceData);
    }
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
        setError({
          message: "Get Ticket Payment Status Failed",
          name: "paymentStatusFailed",
          status: response.status.toString(),
        });
        setIsToastOpen(true);
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

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <div className="h-screen flex justify-center items-center">
        <div className="p-8 modal-box outline-double outline-gray-200">
          <h3 className="mb-4 text-center text-3xl font-bold text-black-2 text-primary">
            Detail Tiket
          </h3>
          <label className="form-control mb-4 w-full ">
            <span className="label-text font-bold">ID Transaksi</span>
            <p className="text-lg">{tiketInvoiceData?.transaction_id}</p>
          </label>
          <div className="flex flex-row items-start">
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">Nama</span>
              <p className="text-lg">{tiketInvoiceData?.name}</p>
            </label>
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">Email</span>
              <p className="text-lg">{tiketInvoiceData?.email}</p>
            </label>
          </div>
          <label className="form-control mb-4 w-full ">
            <span className="label-text font-bold">Asal Kota</span>
            <p className="text-lg">{tiketInvoiceData?.user?.hometown}</p>
          </label>
          <div className="flex flex-row items-start justify-between">
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">Jumlah Pembelian</span>
              <p className="text-lg">{tiketInvoiceData?.quantity}</p>
            </label>
            <label className="form-control mb-4 w-full ">
              <span className="label-text font-bold">Total Pembayaran</span>
              <p className="text-lg">
                Rp. {tiketInvoiceData?.total_pembayaran}
              </p>
            </label>
          </div>
          <label className="form-control mb-4 ">
            <span className="label-text font-bold ">Lokasi Wisata</span>
            <p className="text-lg">{tiketInvoiceData?.wisata?.name}</p>
          </label>
          <label className="form-control mb-4 w-full ">
            <span className="label-text font-bold">Status Pembayaran</span>
            <p
              className={`text-lg font-bold ${
                tiketInvoiceData?.status === "SETTLEMENT"
                  ? "text-primary"
                  : tiketInvoiceData?.status === "PENDING"
                  ? "text-info"
                  : "text-error"
              }`}
            >
              {mapStatusToDescription(tiketInvoiceData?.status)}
            </p>
          </label>
        </div>
      </div>
    </>
  );
}
