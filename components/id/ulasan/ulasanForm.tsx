import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createUlasanAction } from "@/app/data/action/ulasanFormAction";
import { useFormState } from "react-dom";
import Cookies from "js-cookie";
import Image from "next/image";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import ToastError from "../response/ToastResponse";
import { ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
interface ulasanFormProps {
  editedUlasanId?: number;
  content?: string;
  wisataId: number;
  parent_comment_id?: number;
  replied_to_id?: number;
}

interface FormUlasanState {
  content: string;
}

const INITIAL_STATE = {
  data: null,
};

export default function UlasanForm({
  editedUlasanId,
  content,
  wisataId,
  parent_comment_id,
  replied_to_id,
}: ulasanFormProps) {
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formCreateState, formCreateAction] = useFormState(
    createUlasanAction,
    INITIAL_STATE
  );
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const [formUlasanState, setFormUlasanState] = useState<FormUlasanState>({
    content: content || "",
  });

  useEffect(() => {
    if (content) {
      setFormUlasanState({
        content: content,
      });
    }

    if (formCreateState.strapiError) {
      setIsToastOpen(true);
    }

    if (formCreateState.isSuccess) {
      parsedUserSession.point++;
      Cookies.set("session", JSON.stringify(parsedUserSession), {
        expires: 1, // 1 day
        path: "/",
        domain: process.env.HOST ?? "localhost",
        secure: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [formCreateState]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isSuccess]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormUlasanState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleEditAction = async () => {
    setIsLoading(true);
    const formattedBody = {
      data: {
        content: formUlasanState.content,
      },
    };

    try {
      const response = await ulasanService.editUlasan(
        editedUlasanId ? editedUlasanId : 0,
        formattedBody
      );
      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
        setIsToastOpen(true);
      } else {
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
        error={formCreateState.strapiError || strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <ModalLoadingLite isOpen={isLoading} />
      <form className="flex flex-col mt-8 gap-4" action={formCreateAction}>
        <input
          type="text"
          placeholder="Type here"
          name="post_wisata_id"
          className="input input-bordered w-full"
          value={wisataId}
          hidden
          readOnly
        />
        <input
          type="text"
          placeholder="Type here"
          name="parent_comment_id"
          className="input input-bordered w-full"
          value={parent_comment_id}
          hidden
          readOnly
        />
        <input
          type="text"
          placeholder="Type here"
          name="replied_to_id"
          className="input input-bordered w-full"
          value={replied_to_id}
          hidden
          readOnly
        />
        <div className="flex flex-row ">
          {!editedUlasanId && parsedUserSession.img_profile ? (
            <div className="w-24 h-fit rounded-full border-4 border-gray-300 overflow-hidden">
              <Image
                alt="Image Profile"
                width={1200}
                height={1200}
                src={
                  parsedUserSession.img_profile?.url
                    ? parsedUserSession.img_profile.url
                    : `https://avatar.iran.liara.run/username?username=${parsedUserSession.user_id?.username}`
                }
                className="object-cover w-full h-[70px] md:h-20"
              />
            </div>
          ) : (
            !editedUlasanId && (
              <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} />
            )
          )}
          <textarea
            placeholder="Tulis Ulasan..."
            name="content"
            className={`
              textarea textarea-bordered textarea-lg 
              w-full min-h-64
              ${!editedUlasanId ? "ml-4" : ""} 
              resize-none`}
            value={formUlasanState.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          {editedUlasanId ? (
            <span
              onClick={handleEditAction}
              className="
                btn
                rounded-lg 
                bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500
                focus:outline-none
                text-white font-bold text-xs lg:text-md xl:text-xl"
            >
              Simpan Ulasan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </span>
          ) : (
            <button
              onClick={() => setIsLoading(true)}
              type="submit"
              className="
                btn
                rounded-lg 
                bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500
                focus:outline-none
                text-white font-bold text-xs lg:text-md xl:text-xl"
            >
              Kirim Ulasan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
