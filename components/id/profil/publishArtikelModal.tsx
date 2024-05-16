import { artikelService } from "@/app/data/services";
import { Artikel } from "@/components/types/artikel";
import React, { useEffect, useState } from "react";
import ToastError from "../response/ToastResponse";
import SuccessModal from "../response/SuccessModal";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface PublishArtikelModalProps {
  slug: string;
}

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export default function PublishArtikelModal({
  slug,
}: PublishArtikelModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState("");
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  useEffect(() => {
    if (isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.replace("/profil?tab=artikel");
      }, 2000);
    }
  });

  // handle form showing state and data state
  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handlePublish = async () => {
    (
      document.getElementById("publish_artikel_modal") as HTMLDialogElement
    ).close();
    setIsLoading(true);

    try {
      const response = await artikelService.ajukanPublikasi(slug);

      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
      } else {
        setResponseSuccess(response.message);
        setIsSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Publish failed:", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
    setIsToastOpen(true);
  };

  return (
    <>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <SuccessModal message="Ajukan Publikasi Berhasil!" />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="publish_artikel_modal" className="modal">
        <div className="modal-box w-fit">
          <h1 className="mb-4 text-center text-4xl font-bold text-black-2">
            Terbitkan Artikel
          </h1>
          <p className="mb-4 text-center text-lg">
            Apakah anda yakin untuk menerbitkan artikel ini?
          </p>
          <div
            role="alert"
            className="alert alert-warning bg-opacity-30 mb-4 rounded-none text-sm"
          >
            <WarningAmberIcon />
            <span>
              <b>Peringatan</b>: Artikel yang
            dalam masa pengajuan tidak dapat di ubah dan pastikan telah
            menyimpan artikel jika sebelumnya telah melakukan perubahan pada artikel
            </span>
          </div>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">Batal</button>
            </form>
            <button
              onClick={() => handlePublish()}
              className="btn btn-primary text-white"
            >
              Terbitkan
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
