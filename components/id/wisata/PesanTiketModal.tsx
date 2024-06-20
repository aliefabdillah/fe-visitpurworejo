import { laporanUlasanService, tiketService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Wisata } from "@/components/types/wisata";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { v4 as uuidv4 } from "uuid";
import ToastError from "../response/ToastResponse";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import SuccessModal from "../response/SuccessModal";

export default function PesanTiketModal({
  wisataData,
}: {
  wisataData: Wisata;
}) {
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [user, setUser] = useState({
    url: "",
    name: "",
    point: "",
  });
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const langDict: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    setAmount((wisataData?.tiket ? wisataData.tiket : 0) * quantity);
  }, [quantity, wisataData]);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(langDict);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [langDict, query, searchParams]);

  useEffect(() => {
    if (isSuccess && paymentLink) {
      window.location.href = paymentLink;
    }
  }, [isSuccess, paymentLink]);

  useEffect(() => {
    setUser({
      url: parsedUserSession?.img_profile?.url,
      point: parsedUserSession?.point,
      name: parsedUserSession?.username,
    });
  }, [
    parsedUserSession?.img_profile?.url,
    parsedUserSession?.point,
    parsedUserSession?.username,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    (document.getElementById("tiket_modal") as HTMLDialogElement).close();
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const phone = String(formData.get("phone"));

    const orderId = uuidv4();
    if (quantity < 1) {
      setError({
        message: intl ? intl.modalOrderTicket.validationMinimumText : "",
        name: "",
        status: "",
      });
      setIsToastOpen(true);
      setIsLoading(false);
      return false;
    }

    const body = {
      data: {
        name: name,
        email: email,
				quantity: quantity,
        total_pembayaran: amount,
        wisata_id: wisataData.id,
        order_id: orderId,
      },
    };

    try {
      const response = await tiketService.createTiket(body);
      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
        setIsToastOpen(true);
      } else {
        checkout(orderId, quantity, name, email, phone);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Delete failed:", error);
      setIsLoading(false);
      setIsSuccess(false);
      setIsToastOpen(true);
    }
  };

  const checkout = async (
    orderId: string,
    quantity: number,
    name: string,
    email: string,
    phone: string
  ) => {
    const secret: any = process.env.MIDTRANS_SECRET;
    const encodedSecret = Buffer.from(secret).toString("base64");
    const basicAuth = `Basic ${encodedSecret}`;

    let data = {
      item_details: [
        {
          id: wisataData.id,
          name: `Ticket ${wisataData.name}`,
          price: wisataData.tiket,
          quantity: quantity,
        },
      ],
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
      },
      transaction_details: {
        order_id: orderId,
        gross_amount: (wisataData?.tiket ? wisataData.tiket : 0) * quantity,
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/payment-links`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(data),
      }
    );

    const paymentLink = await response.json();
    if (paymentLink) {
      setIsSuccess(true);
      setPaymentLink(paymentLink.payment_url);
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
      <SuccessModal
        message={intl ? intl.comment.modalReport.successModal : ""}
      />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="tiket_modal" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-2xl text-center mb-4 font-bold">
            {intl ? intl.modalOrderTicket.title : ""}
          </h3>
          <form onSubmit={handleSubmit}>
            {wisataData && (
              <input
                type="text"
                placeholder="Type here"
                name="wisataId"
                className="input input-bordered w-full"
                value={wisataData.id}
                hidden
              />
            )}
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="label-text font-bold">
                  {intl ? intl.modalOrderTicket.nameFieldLabel : ""}
                </span>
              </div>
              <input
                type="text"
                name="name"
                placeholder={intl ? intl.modalOrderTicket.namePlaceholder : ""}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="label-text font-bold">
                  {intl ? intl.modalOrderTicket.emailFieldLabel : ""}
                </span>
              </div>
              <input
                type="text"
                name="email"
                placeholder={intl ? intl.modalOrderTicket.emailPlaceholder : ""}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="label-text font-bold">
                  {intl ? intl.modalOrderTicket.phoneFieldLabel : ""}
                </span>
              </div>
              <input
                type="text"
                name="phone"
                placeholder={intl ? intl.modalOrderTicket.phonePlaceholder : ""}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="label-text font-bold">
                  {intl ? intl.modalOrderTicket.quantityFieldLabel : ""}
                </span>
              </div>
              <input
                min={0}
                type="number"
                name="quantity"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input input-bordered w-full"
              />
              <div className="label">
                <span className="label-text-alt">
                  <span className="text-red-500">*</span>
                  {intl ? intl.modalOrderTicket.priceText : ""}{""}
                  <b>{wisataData?.tiket ? wisataData.tiket : 0}</b>
                </span>
              </div>
            </label>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-bold">
                  {intl ? intl.modalOrderTicket.amountText : ""}
                </span>
              </div>
              <input
                type="number"
                name="amount"
                value={amount}
                readOnly
                placeholder="0"
                className="input input-bordered w-full"
              />
            </label>
            <p className="text-xs mb-4">
              {user.name ? (
                `${intl ? intl.modalOrderTicket.outroText : ""}`
              ) : (
                <span className="">
                  {intl ? intl.comment.modalReport.loginRequired : ""}&nbsp;
                  <Link
                    className="font-bold underline text-primary"
                    href={{ pathname: "/auth/login", query: { lang: lang } }}
                  >
                    {intl ? intl.loginRequired.buttonText : ""}
                  </Link>
                </span>
              )}
            </p>
            {paymentLink ? (
              <div
                role="alert"
                className="alert bg-success bg-opacity-30 mb-4 rounded-none"
              >
                <WarningAmberIcon />
                <span>
                  {intl ? intl.modalOrderTicket.linkPaymentText : ""}
                  <br />
                  {paymentLink}
                </span>
              </div>
            ) : (
              <button
                disabled={user.name ? false : true}
                type="submit"
                className="
                    btn btn-sm w-full 
                    bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500 focus:outline-none
                text-white"
              >
                {intl ? intl.modalOrderTicket.buttonText : ""}
              </button>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
}
