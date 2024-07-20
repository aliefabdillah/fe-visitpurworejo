"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import UlasanData from "./ulasanData";
import { ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { Ulasan } from "@/components/types/ulasan";
import { LikeDislike } from "@/components/types/likeDislike";
import DeletedUlasan from "./DeletedUlasan";
import ModalReport from "./modalReport";
import Loading from "@/components/Loader/Loading";
import EmptyData from "../EmptyData";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import ToastError from "../response/ToastResponse";
export default function UlasanList({
  slug,
  userId,
}: {
  slug: string;
  userId: number;
}) {
  const [activeTab, setActiveTab] = useState({
    position: 0,
    name: "best",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ulasanData, setUlasanData] = useState<Ulasan[]>([]);
  const [reportedUlasanId, setReportedUlasanId] = useState<number>(0);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setStrapiError] = useState<StrapiErrorsProps>({
    message: "",
    status: "",
    name: "",
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

  const handleTabClick = (index: number) => {
    setActiveTab({
      position: index,
      name: index === 0 ? "best" : index === 1 ? "newest" : "oldest",
    });
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    const response = await ulasanService.getUlasanWisata(slug);
    if (response.error) {
      setStrapiError({
        message: response.error.message,
        status: response.error.status,
        name: response.error.name,
      });
      setIsToastOpen(true);
    } else {
      const ulasanResult: any[] = response.data;
      const formattedUlasanData: Ulasan[] = ulasanResult.map((ulasan) => {
        return {
          id: ulasan.id,
          content: ulasan.content,
          like: ulasan.like,
          dislike: ulasan.dislike,
          posting_date: ulasan.posting_date,
          isDeleted: ulasan.isDeleted,
          wisata: {
            id: ulasan.post_wisata_id.id,
            name: ulasan.post_wisata_id.name,
          },
          user_id: {
            id: ulasan.user_id.id,
            username: ulasan.user_id.username,
            img_profile: {
              url: ulasan.user_id.img_profile?.url,
              name: ulasan.user_id.img_profile?.name,
            },
          },
          likeDislike: ulasan.like_dislike_ulasan_id.map(
            (like_dislike: any) => ({
              id: like_dislike.id,
              isLike: like_dislike.isLike,
              isDislike: like_dislike.isDislike,
              ulasan__id: like_dislike.ulasan_id,
              user: {
                id: like_dislike.user_id?.id,
                username: like_dislike.user_id?.username,
              },
            })
          ),
          child_comment: ulasan.child_comment_id.map((child_comment: any) => ({
            id: child_comment.id,
            ulasan: child_comment.content,
            like: child_comment.like,
            content: child_comment.content,
            dislike: child_comment.dislike,
            posting_date: child_comment.posting_date,
            isDeleted: child_comment.isDeleted,
            wisata: {
              id: child_comment.post_wisata_id.id,
              name: child_comment.post_wisata_id.name,
            },
            user_id: {
              id: child_comment.user_id?.id,
              username: child_comment.user_id?.username,
              img_profile: {
                url: child_comment.user_id?.img_profile?.url,
                name: child_comment.user_id?.img_profile?.name,
              },
            },
            replied_to: {
              id: child_comment.replied_to_id.id,
              user: {
                id: child_comment.replied_to_id.user_id.id,
                username: child_comment.replied_to_id.user_id.username,
              },
            },
            likeDislike: child_comment.like_dislike_ulasan_id.map(
              (like_dislike: any) => ({
                id: like_dislike.id,
                isLike: like_dislike.isLike,
                isDislike: like_dislike.isDislike,
                ulasan__id: like_dislike.ulasan_id,
                user: {
                  id: like_dislike.user_id?.id,
                  username: like_dislike.user_id?.username,
                },
              })
            ),
          })),
        };
      });

      if (activeTab.name === "best") {
        formattedUlasanData.sort(
          (a, b) => parseInt(b.like || "0") - parseInt(a.like || "0")
        );
      } else if (activeTab.name === "newest") {
        formattedUlasanData.sort(
          (a, b) =>
            new Date(b.posting_date || "").getTime() -
            new Date(a.posting_date || "").getTime()
        );
      } else if (activeTab.name === "oldest") {
        formattedUlasanData.sort(
          (a, b) =>
            new Date(a.posting_date || "").getTime() -
            new Date(b.posting_date || "").getTime()
        );
      }

      setUlasanData(formattedUlasanData);
      setIsLoading(false);
    }
  };

  const getReportedData = (ulasanId: number) => {
    setReportedUlasanId(ulasanId);
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
      <div role="tablist" className="tabs tabs-xs md:tabs-md xl:tabs-lg">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label={intl ? intl.comment.bestTab : ""}
          checked={activeTab.position === 0}
          onChange={() => handleTabClick(0)}
        />
        <div role="tabpanel" className="tab-content">
          {isLoading ? (
            <div className="flex justify-center my-6">
              <Loading />
            </div>
          ) : ulasanData.length ? (
            ulasanData.map((ulasanItem, index) => (
              <div key={index} className="my-5">
                {/* PARENT COMMENT */}
                <UlasanData
                  ulasanData={ulasanItem}
                  className="mb-8"
                  parentCommentId={ulasanItem.id}
                  getReportedData={getReportedData}
                />
                {ulasanItem.child_comment?.map(
                  (childCommentItem, childIndex) => (
                    /* REPLY COMMENT */
                    <UlasanData
                      key={childIndex}
                      className="ml-8 md:ml-12 xl:ml-24 my-8"
                      ulasanData={childCommentItem}
                      parentCommentId={ulasanItem.id}
                      getReportedData={getReportedData}
                    />
                  )
                )}
              </div>
            ))
          ) : (
            <div className="mt-12">
              <EmptyData halaman={intl ? intl.comment.title : ""} />
            </div>
          )}
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label={intl ? intl.comment.newestTab : ""}
          checked={activeTab.position === 1}
          onChange={() => handleTabClick(1)}
        />
        <div role="tabpanel" className="tab-content">
          {isLoading ? (
            <div className="flex justify-center my-6">
              <Loading />
            </div>
          ) : ulasanData.length ? (
            ulasanData.map((ulasanItem, index) => (
              <div key={index} className="my-5">
                {/* PARENT COMMENT */}
                <UlasanData
                  ulasanData={ulasanItem}
                  className="mb-8"
                  parentCommentId={ulasanItem.id}
                  getReportedData={getReportedData}
                />
                {ulasanItem.child_comment?.map((childCommentItem, index) => (
                  /* REPLY COMMENT */
                  <UlasanData
                    key={index}
                    className="ml-24 my-8"
                    ulasanData={childCommentItem}
                    parentCommentId={ulasanItem.id}
                    getReportedData={getReportedData}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="mt-12">
              <EmptyData halaman={intl ? intl.comment.title : ""} />
            </div>
          )}
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label={intl ? intl.comment.oldestTab : ""}
          checked={activeTab.position === 2}
          onChange={() => handleTabClick(2)}
        />
        <div role="tabpanel" className="tab-content">
          {isLoading ? (
            <div className="flex justify-center my-6">
              <Loading />
            </div>
          ) : ulasanData.length ? (
            ulasanData.map((ulasanItem, index) => (
              <div key={index} className="my-5">
                {/* PARENT COMMENT */}
                {ulasanItem.isDeleted ? (
                  <DeletedUlasan className="mb-8" />
                ) : (
                  <UlasanData
                    ulasanData={ulasanItem}
                    className="mb-8"
                    parentCommentId={ulasanItem.id}
                    getReportedData={getReportedData}
                  />
                )}
                {ulasanItem.child_comment?.map((childCommentItem, index) => (
                  /* REPLY COMMENT */
                  <UlasanData
                    key={index}
                    className="ml-24 my-8"
                    ulasanData={childCommentItem}
                    parentCommentId={ulasanItem.id}
                    getReportedData={getReportedData}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="mt-12">
              <EmptyData halaman={intl ? intl.comment.title : ""} />
            </div>
          )}
        </div>
        <ModalReport ulasanId={reportedUlasanId} />
      </div>
    </>
  );
}
