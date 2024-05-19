"use client";
import { laporanUlasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import React, { useEffect, useState } from "react";
import ToastError from "../response/ToastResponse";
import SuccessModal from "../response/SuccessModal";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import Cookies from "js-cookie";
import LoginRequired from "../response/LoginRequired";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const category = [
  "Spam",
  "Pekecehan",
  "Informasi Tidak Benar",
  "Kontent Tidak Pantaas",
  "Kebencian atau Diskriminasi",
  "Pelanggaran Hak Cipta",
  "Privasi",
  "Penipuan",
  "Penggunaan Bahasa Tidak Pantas",
  "Lainnya",
];

export default function ModalReport({ ulasanId }: { ulasanId: number }) {
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [user, setUser] = useState({
    url: "",
    name: "",
    point: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
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

  useEffect(() => {
    setUser({
      url: parsedUserSession?.img_profile?.url,
      point: parsedUserSession?.point,
      name: parsedUserSession?.username,
    });
  }, [parsedUserSession?.img_profile?.url, parsedUserSession?.point, parsedUserSession?.username])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = formData.get("category");
    const details = formData.get("details");

    const body = {
      data: {
        category: category,
        detail: details,
        ulasan_id: ulasanId,
      },
    };

    (document.getElementById("report_modal") as HTMLDialogElement).close();
    setIsLoading(true);
    try {
      const response = await laporanUlasanService.reportUlasan(body);
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
      <SuccessModal message="Berhasil Melaporkan Ulasan!" />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="report_modal" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-2xl text-center mb-4 font-bold">
            Laporkan Komentar
          </h3>
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-bold">
                  Kenapa Anda Melaporkan komentar ini?
                </span>
              </div>
              <select
                name="category"
                className="select select-bordered w-full overflow-y-auto"
              >
                <option hidden>Kategori Laporan</option>
                {category.map((categoryItem, index) => (
                  <option key={index}>{categoryItem}</option>
                ))}
              </select>
            </label>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-bold">
                  Detail Laporan (Optional)
                </span>
              </div>
              <textarea
                name="details"
                placeholder="Tuliskan detail laporan...."
                className="
                  textarea textarea-bordered textarea-md 
                  w-full min-h-40
                  resize-none"
              ></textarea>
            </label>
            <p className="text-xs mb-4">
              {user.name ? (
                "Apakah anda yakin untuk melaporkan komentar ini?"
              ) : (
                <span className="">
                  Login terlebih dahulu untuk memberikan ulasan.&nbsp;
                  <Link
                    className="font-bold underline text-primary"
                    href={{ pathname: "/auth/login", query: { lang: lang } }}
                  >
                    Login
                  </Link>
                </span>
              )}
            </p>
            <button
              disabled={user.name ? false : true}
              type="submit"
              className="
            btn btn-sm w-full 
            bg-gradient-to-l from-accent from-10% to-secondary to-90%
          hover:from-yellow-500 hover:to-orange-500 focus:outline-none
          text-white"
            >
              Kirim
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
