import { wisataFavoriteService } from "@/app/data/services";
import React, { useEffect, useState } from "react";
import SuccessModal from "../response/SuccessModal";
import ModalLoading from "@/components/Loader/ModalLoading";
import ToastError from "../response/ToastResponse";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export default function DeleteModal() {
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
        window.location.reload();
      }, 2000);
    }
  });
  
  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleDelete = async () => {
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
    setIsLoading(true);

    try {
      const response = await wisataFavoriteService.deleteAllFavorite()

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
      <SuccessModal message="Hapus Data Sukses!" />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-fit">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
            Hapus Favorit
          </h1>
          <p className="mb-4 text-center">
            Apakah anda yakin untuk menghapus seluruh wisata dari daftar favorit?
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">Batal</button>
            </form>
            <button
              onClick={() =>
                handleDelete()
              }
              className="btn btn-error text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
