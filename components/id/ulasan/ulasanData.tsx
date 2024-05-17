import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModalReport from "./modalReport";
import UlasanForm from "./ulasanForm";
import { Ulasan } from "@/components/types/ulasan";
import Image from "next/image";
import { formatDate } from "@/components/lib/formatter";
import Cookies from "js-cookie";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginRequired from "../response/LoginRequired";
import { ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import ToastError from "../response/ToastResponse";
import DeletedUlasan from "./DeletedUlasan";

export default function UlasanData({
  ulasanData,
  parentCommentId,
  userId,
  className,
}: {
  ulasanData: Ulasan;
  parentCommentId?: number;
  userId?: number;
  className?: string;
}) {
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  useEffect(() => {
    if (isSuccess) {
      --parsedUserSession.point;
      Cookies.set("session", JSON.stringify(parsedUserSession), {
        expires: 1, // 1 day
        path: "/",
        domain: process.env.HOST ?? "localhost",
        secure: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isSuccess]);

  const handleDeleteButton = async (id: number) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus ulasan? perubahan tidak dapat dikembalikan.",
    );

    if (confirmDelete) {
      setIsLoading(true)
      try {
        const response = await ulasanService.deleteUlasan(id)
        if (response.error) {
          setError({
            message: response.error.message,
            name: response.error.name,
            status: response.error.status,
          })
          setIsToastOpen(true);
          setIsLoading(false);
        } else {
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("Delete failed:", error);
        setIsLoading(false);
        setIsSuccess(false);
        setIsToastOpen(true);
      }
    }
  }

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <>
      <ModalLoadingLite isOpen={isLoading}/>
      {ulasanData.isDeleted ? 
        <DeletedUlasan className={className}/>
      : 
      <div className={`flex flex-row gap-3 ${className}`}>
        <ToastError
          error={strapiError}
          classname="alert-error"
          isOpen={isToastOpen}
          onClose={handleCloseToast}
        />
        <ModalLoadingLite isOpen={isLoading}/>
        {ulasanData?.user_id?.img_profile ? (
          <div className="w-24 h-fit rounded-full border-4 border-gray-300 overflow-hidden">
            <Image
              alt="Image Profile"
              width={1200}
              height={1200}
              src={
                ulasanData?.user_id?.img_profile?.url
                  ? ulasanData.user_id.img_profile.url
                  : `https://avatar.iran.liara.run/username?username=${ulasanData.user_id?.username}`
              }
              className="object-cover w-full h-[70px] md:h-20"
            />
          </div>
        ) : (
          <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} />
        )}
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row justify-between items-start mt-4">
            <div className="flex flex-row items-start gap-1">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-extrabold">
                  {ulasanData?.user_id?.username || "-"}
                </p>
                <p className="font-extralight text-sm">
                  {formatDate(ulasanData?.posting_date || "")}
                </p>
              </div>
              {ulasanData.replied_to && (
                <>
                  <ArrowRightIcon sx={{ fontSize: 35 }} />
                  <p className="text-2xl font-extrabold">
                    {ulasanData.replied_to.user?.username || "-"}
                  </p>
                </>
              )}
            </div>
            {userId === ulasanData.user_id?.id ? (
              <button className="font-bold text-error" onClick={() => handleDeleteButton(ulasanData.id)}>
                <DeleteIcon className="mr-1" />
                Hapus
              </button>
            ) : (
              <>
                <button
                  className="font-bold text-error"
                  onClick={() =>
                    (
                      document.getElementById(
                        "report_modal"
                      )! as HTMLDialogElement
                    ).showModal()
                  }
                >
                  <FlagIcon className="mr-1" />
                  Laporkan
                </button>
                <ModalReport />
              </>
            )}
          </div>
          {showEditForm ? (
            <div>
              <UlasanForm
                wisataId={ulasanData.wisata?.id || 0}
                editedUlasanId={ulasanData.id}
                content={ulasanData.content}
              />
            </div>
          ) : (
            <>
              <p className="text-wrap text-lg">{ulasanData?.content || "-"}</p>
            </>
          )}
          <div className="flex flex-row gap-6">
            <button className="font-bold ">
              <ThumbUpIcon className="mr-2" />({ulasanData?.like || "0"})
            </button>
            <button className="font-bold ">
              <ThumbDownIcon className="mr-2" />({ulasanData?.dislike || "0"})
            </button>
            {userId === ulasanData.user_id?.id && !showReplyForm && (
              <button className="font-bold text-primary" onClick={toggleEditForm}>
                Edit
              </button>
            )}
            {!showEditForm && 
              <button className="font-bold text-primary" onClick={toggleReplyForm}>
                Balas
              </button>
            }
          </div>
          {showReplyForm && (
            <div>
              {userSession ? (
                <UlasanForm
                  wisataId={ulasanData.wisata?.id || 0}
                  parent_comment_id={parentCommentId}
                  replied_to_id={ulasanData.id}
                />
              ) : (
                <LoginRequired />
              )}
            </div>
          )}
        </div>
      </div>
      }
    </>
  );
}
