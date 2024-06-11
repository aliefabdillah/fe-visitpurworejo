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
import { likeDislikeService, ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import ToastError from "../response/ToastResponse";
import DeletedUlasan from "./DeletedUlasan";
import { LikeDislike } from "@/components/types/likeDislike";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function UlasanData({
  ulasanData,
  parentCommentId,
  className,
  getReportedData,
}: {
  ulasanData: Ulasan;
  parentCommentId?: number;
  className?: string;
  getReportedData: (ulasanId: number) => void;
}) {
  const userId = Cookies.get('id');
  const [idUser, setIdUser] = useState<number | null>(userId ? parseInt(userId) : 0);
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
  const [isLiked, setIsLiked] = useState(true);
  const [isDisliked, setIsDisliked] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
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
    const handleCookiesChange = () => {
      const userSession = Cookies.get("id");
      setIdUser(userSession ? parseInt(userSession): 0)
    };

    handleCookiesChange(); // Check cookies initially

    const interval = setInterval(() => {
      handleCookiesChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      "Apakah Anda yakin ingin menghapus ulasan? perubahan tidak dapat dikembalikan."
    );

    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await ulasanService.deleteUlasan(id);
        if (response.error) {
          setError({
            message: response.error.message,
            name: response.error.name,
            status: response.error.status,
          });
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
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleLaporanUlasan = (ulasanId: number) => {
    getReportedData(ulasanId);
    (document.getElementById("report_modal")! as HTMLDialogElement).showModal();
  };

  useEffect(() => {
    setLikesCount(
      ulasanData.likeDislike
        ? ulasanData.likeDislike.filter((ld) => ld.isLike === true).length
        : 0
    );
    setDislikesCount(
      ulasanData.likeDislike
        ? ulasanData.likeDislike.filter((ld) => ld.isDislike === true).length
        : 0
    );

    if (ulasanData && userId) {
      const userLikeDislike = ulasanData.likeDislike?.find(
        (ld) => ld.user?.id === parseInt(userId)
        );
      setIsLiked(userLikeDislike?.isLike ? userLikeDislike.isLike : false);
      setIsDisliked(userLikeDislike?.isDislike ? userLikeDislike.isDislike : false);
    }
  }, [ulasanData, userId]);

  const handleLikeDislikeButton = async (
    ulasanId: number,
    like?: boolean,
    dislike?: boolean
  ) => {
    try {
      var response;
      if (!isLiked && !isDisliked) {
        const body = {
          data: {
            ulasan_id: ulasanId,
            isLike: like,
            isDislike: dislike,
          },
        };
        if (like) {
          setLikesCount(likesCount + 1)
          setIsLiked(true)
        } else {
          setDislikesCount(dislikesCount + 1);
          setIsDisliked(true)
        }
        response = await likeDislikeService.createLikeDislikeUlasan(body);
      } else {
        var body;
        if (isLiked && dislike) {
          body = {
            data: {
              isLike: false,
              isDislike: dislike,
            },
          };
          setLikesCount(likesCount - 1)
          setDislikesCount(dislikesCount + 1);
          setIsLiked(false)
          setIsDisliked(true)
        } else if (isDisliked && like) {
          body = {
            data: {
              isLike: like,
              isDislike: false,
            },
          };
          setLikesCount(likesCount + 1)
          setDislikesCount(dislikesCount - 1);
          setIsLiked(true)
          setIsDisliked(false)
        } else {
          body = {
            data: {
              isLike: false,
              isDislike: false,
            },
          };
          if (like) {
            setLikesCount(likesCount - 1)
            setIsLiked(false)
          } else {
            setDislikesCount(dislikesCount - 1);
            setIsDisliked(false)
          }
        }
        response = await likeDislikeService.updateLikeDislikeUlasan(
          body,
          ulasanId
        );
      }

      if (response.error) {
        setError({
          message: response.error.message,
          name: response.error.name,
          status: response.error.status,
        });
        setIsToastOpen(true);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setIsToastOpen(true);
    }
  };

  const countLikesDislikes = (
    likeDislikeArray: LikeDislike[],
    isLike: boolean,
    isDislike: boolean
  ) => {
    if (isLike) {
      return likeDislikeArray.filter((ld) => ld.isLike === isLike).length;
    } else {
      return likeDislikeArray.filter((ld) => ld.isDislike === isDislike).length;
    }
  };

  return (
    <>
      <ModalLoadingLite isOpen={isLoading} />
      {ulasanData.isDeleted ? (
        <DeletedUlasan className={className} />
      ) : (
        <div className={`flex flex-row gap-3 ${className}`}>
          <ToastError
            error={strapiError}
            classname="alert-error"
            isOpen={isToastOpen}
            onClose={handleCloseToast}
          />
          <ModalLoadingLite isOpen={isLoading} />
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
                <button
                  className="font-bold text-error"
                  onClick={() => handleDeleteButton(ulasanData.id)}
                >
                  <DeleteIcon className="mr-1" />
                  {intl ? intl.comment.deleteButtonText :""}
                </button>
              ) : (
                <>
                  <button
                    className="font-bold text-error"
                    onClick={() => handleLaporanUlasan(ulasanData.id)}
                  >
                    <FlagIcon className="mr-1" />
                    {intl ? intl.comment.reportButtonText :""}
                  </button>
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
                <p className="text-wrap text-lg">
                  {ulasanData?.content || "-"}
                </p>
              </>
            )}
            <div className="flex flex-row gap-6">
              <button
                className="font-bold "
                onClick={() =>
                  handleLikeDislikeButton(ulasanData.id, true, false)
                }
              >
                <ThumbUpIcon
                  className={`mr-2 ${isLiked ? "fill-success" : ""}`}
                />
                (
                {likesCount}
                )
              </button>
              <button
                className="font-bold "
                onClick={() =>
                  handleLikeDislikeButton(ulasanData.id, false, true)
                }
              >
                <ThumbDownIcon
                  className={`mr-2 ${isDisliked ? "fill-error" : ""}`}
                />
                (
                {dislikesCount}
                )
              </button>
              {userId === ulasanData.user_id?.id && !showReplyForm && (
                <button
                  className="font-bold text-primary"
                  onClick={toggleEditForm}
                >
                  {intl ? intl.comment.editButtonText :""}
                </button>
              )}
              {!showEditForm && (
                <button
                  className="font-bold text-primary"
                  onClick={toggleReplyForm}
                >
                  {intl ? intl.comment.replyButtonText :""}
                </button>
              )}
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
      )}
    </>
  );
}
