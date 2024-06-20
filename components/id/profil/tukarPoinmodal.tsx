import { hadiahService } from "@/app/data/services";
import { Hadiah } from "@/components/types/hadiah";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import React, { useEffect, useRef, useState } from "react";
import ToastError from "../response/ToastResponse";
import SuccessModal from "../response/SuccessModal";
import ModalLoading from "@/components/Loader/ModalLoading";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import Cookies from "js-cookie";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function TukarPoinmodal({
  hadiah,
  onClose,
  userSession,
}: {
  hadiah: Hadiah | null;
  onClose?: () => void;
  userSession: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

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
  }, [isSuccess]);

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleBackButtonState = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleTukarButton = async (id: number) => {
    (document.getElementById("tukar_poin_modal") as HTMLDialogElement).close();
    setIsLoading(true);

    try {
      const response = await hadiahService.redeemPoint(id);

      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
        setIsToastOpen(true);
      } else {
        setResponseSuccess(response.message);
        setIsSuccess(true);
        userSession.point =
          userSession.point -
          (hadiah?.redeem_points ? hadiah.redeem_points : 0);
        Cookies.set("session", JSON.stringify(userSession), {
          expires: 1, // 1 day
          path: "/",
          secure: false,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Delete failed:", error);
      setIsLoading(false);
      setIsSuccess(false);
      setIsToastOpen(true);
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
      <SuccessModal message={intl ? intl.profile.accountData.redeemTab.modal.successText : ""} />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog ref={dialogRef} className="modal" id="tukar_poin_modal">
        <div className="modal-box w-fit">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
          {intl ? intl.profile.accountData.redeemTab.modal.title : ""}
          </h1>
          <p className="mb-4 text-center">
          {intl ? intl.profile.accountData.redeemTab.modal.question : ""}{" "}
            <b>{hadiah?.name ? hadiah.name : "-"}</b>?
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button
                onClick={handleBackButtonState}
                className="btn btn-outline btn-warning"
              >
                {intl ? intl.profile.accountData.redeemTab.modal.cancelButtonText : ""}
              </button>
            </form>
            <button
              onClick={() => handleTukarButton(hadiah?.id ? hadiah.id : 0)}
              className="btn btn-primary text-white"
            >
              {intl ? intl.profile.accountData.redeemTab.modal.redeemButtonText : ""}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
