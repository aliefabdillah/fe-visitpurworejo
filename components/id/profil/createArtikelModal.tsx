import React, { useEffect, useState } from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useFormState } from "react-dom";
import { createArtikelAction } from "@/app/data/action/formArtikel";
import StrapiErrors from "../response/StrapiErrors";
import ModalLoading from "@/components/Loader/ModalLoading";
import SuccessModal from "../response/SuccessModal";

interface FormArtikelState {
  title: string;
  // Tambahkan state lain sesuai kebutuhan
}

const INITIAL_STATE = {
  data: null,
};

export default function CreateArtikelModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [formCreateState, formCreateAction] = useFormState(
    createArtikelAction,
    INITIAL_STATE
  );
  const [formArtikelState, setFormArtikelState] = useState<FormArtikelState>({
    title: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormArtikelState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!formCreateState.isLoading) {
      setIsLoading(false);
    }

    if (formCreateState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } 
    
    if (formCreateState.strapiErrors) {
      (
        document.getElementById("create_artikel_modal")! as HTMLDialogElement
      ).showModal()
    }
  }, [formCreateState])

  return (
    <>
      <dialog id="create_artikel_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-4">Buat Artikel</h3>
          <form id="form-create" action={formCreateAction}>
            <label className="form-control w-full">
              <div className="flex flex-row gap-1 mb-1">
                <span className="label-text font-bold">Judul</span>
                <span className="label-text font-bold text-error">*</span>
              </div>
              <div className="indicator w-11/12">
                <span className="indicator-item badge">Required</span>
                <input
                  type="text"
                  name="title"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={formArtikelState.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>
            <button
              type="submit"
              className="
                my-4
                w-full
                btn
                rounded-lg 
                bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500
                focus:outline-none
                text-white font-bold text-xs lg:text-md xl:text-xl"
              onClick={() => {
                (
                  document.getElementById("create_artikel_modal")! as HTMLDialogElement
                ).close()
                setIsLoading(true)
              }}
            >
              <NewspaperIcon />
              Submit Artikel
            </button>
          </form>
          <StrapiErrors
            error={formCreateState.strapiErrors}
            classname="mt-4"
          />
        </div>
      </dialog>
      <ModalLoading isOpen={isLoading} />
      <SuccessModal message={formCreateState.message}/>
    </>
  );
}
