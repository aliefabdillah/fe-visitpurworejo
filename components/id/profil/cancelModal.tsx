import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import React, { useEffect, useState } from "react";
import SuccessModal from "../response/SuccessModal";
import ToastError from "../response/ToastResponse";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useSearchParams } from "next/navigation";

export default function CancelModal({ transactionId }: { transactionId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState("");
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
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
    if (isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleCancelButton = async () => {
    (
      document.getElementById("cancel_tiket_modal") as HTMLDialogElement
    ).close();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cancel-payment?transactionId=${transactionId}`, {
        method: 'POST', // Ensure the method is POST
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await response.json();
      if (!result.ok) {
        throw new Error(`Error: Cancel Payment error`);
      }

      setResponseSuccess("Successfully cancel payment");
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to cancel payment:", error);
      setError({
        message: "Failed to cancel payemnt",
        name: "",
        status: "",
      });
      setIsToastOpen(true);
      setIsLoading(false);
      throw error;
    }
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
        message={
          intl ? intl.profile.accountData.ticketTab.cancelModal.successText : ""
        }
      />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="cancel_tiket_modal" className="modal">
        <div className="modal-box w-fit">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
            {intl ? intl.profile.accountData.ticketTab.cancelModal.title : ""}
          </h1>
          <p className="mb-4 text-center">
            {intl ? intl.profile.accountData.ticketTab.cancelModal.question : ""}
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">
                {intl
                  ? intl.profile.accountData.ticketTab.cancelModal.backButton
                  : ""}
              </button>
            </form>
            <button
              onClick={() => handleCancelButton()}
              className="btn btn-error text-white"
            >
              {intl
                ? intl.profile.accountData.ticketTab.cancelModal.confirmButton
                : ""}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
