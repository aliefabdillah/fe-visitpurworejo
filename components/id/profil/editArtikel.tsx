import React, { useEffect, useState } from "react";
import { artikelService, kategoriService } from "@/app/data/services";
import { Artikel } from "@/components/types/artikel";
import CustomEditor from "../custom-editor";
import { createSlug } from "@/components/lib/slug";
import { useFormState } from "react-dom";
import { editArtikelAction } from "@/app/data/action/formArtikel";
import StrapiErrors from "../response/StrapiErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Link from "next/link";
import { convertInputDate } from "@/components/lib/formatter";
import { Kategori } from "@/components/types/kategori";
import { useQuery } from "react-query";
import ZodErrors from "../response/ZodErrors";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import SuccessModal from "../response/SuccessModal";
import PublishArtikelModal from "./publishArtikelModal";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

interface FormArtikelState {
  id: number;
  judul: string;
  slug: string;
  tanggalUpload: string;
  short_content: string;
  kategori: {
    id: string;
    name: string;
  };
  cover?: {
    url: string;
    name: string;
  };
  konten: string;
  notes: string;
  // Tambahkan state lain sesuai kebutuhan
}

const INITIAL_STATE = {
  data: null,
};

export default function EditArtikel({
  artikelData,
}: {
  artikelData?: Artikel;
}) {
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [singleImage, setSingleImage] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formEditState, formEditAction] = useFormState(
    editArtikelAction,
    INITIAL_STATE
  );
  const [formArtikelState, setFormArtikelState] = useState<FormArtikelState>({
    id: artikelData?.id || 0,
    judul: artikelData?.judul || "",
    slug: artikelData?.slug || "",
    tanggalUpload: artikelData?.tanggal_upload || "",
    short_content: artikelData?.short_content || "",
    kategori: {
      id: artikelData?.kategori?.id || "",
      name: artikelData?.kategori?.name || "",
    },
    konten: artikelData?.konten || "",
    notes: artikelData?.notes || "",
    cover: {
      url: artikelData?.cover?.url || "",
      name: artikelData?.cover?.name || "",
    },
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

  // handle image cover
  const handleSingleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSingleImage(Array.from(e.target.files));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "judul") {
      setFormArtikelState((prevState) => ({
        ...prevState,
        [name]: value,
        slug: createSlug(value),
      }));
    } else {
      setFormArtikelState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  /* GET KATEGORI */
  const { error, data } = useQuery(
    "kategori-artikel",
    async () => await kategoriService.getListKategori(),
    {
      onSuccess(result) {
        if (result.error) {
          setKategoriList([]);
        } else {
          const kategoriResult: any[] = result.data;
          const formatedKategoriData: Kategori[] = kategoriResult.map(
            (item: any) => {
              return {
                id: item.id.toString(),
                name: item.attributes.name,
                slug: item.attributes.slug,
              };
            }
          );
          setKategoriList(formatedKategoriData);
        }
      },
    }
  );

  useEffect(() => {
    if (artikelData) {
      setFormArtikelState({
        id: artikelData.id || 0,
        judul: artikelData.judul || "",
        slug: artikelData.slug || "",
        tanggalUpload: artikelData.tanggal_upload || "",
        short_content: artikelData.short_content || "",
        konten: artikelData.konten,
        kategori: {
          id: artikelData.kategori?.id || "",
          name: artikelData.kategori?.name || "",
        },
        notes: artikelData?.notes || "",
        cover: {
          url: artikelData.cover?.url || "",
          name: artikelData.cover?.name || "",
        },
      });
    }

    if (!formEditState.isLoading) {
      setIsLoading(false);
    }
    if (formEditState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [artikelData, formEditState]);

  return (
    <div className="flex flex-col ">
      <PublishArtikelModal slug={formArtikelState.slug} />
      <SuccessModal message="Berhasil Simpan Artikel" />
      <StrapiErrors error={formEditState.strapiErrors} classname="mb-4" />
      <p className="text-4xl font-extrabold">
        {intl ? intl.profile.editArticle.title : ""}
      </p>
      <form id="form-edit-artikel" action={formEditAction}>
        <div className="flex flex-col md:flex-row mt-6 mb-16 gap-8">
          <div className="flex flex-col gap-4 w-full md:w-3/5 lg:w-9/12">
            {formArtikelState.notes && 
              <div
                role="alert"
                className="alert bg-error bg-opacity-30 mb-2 rounded-lg"
              >
                <span>
                  <b>{intl ? intl.profile.editArticle.notesLabel : ""}</b>: {formArtikelState.notes}
                </span>
              </div>
            }
            {artikelData && (
              <input
                type="text"
                placeholder="Type here"
                name="id"
                className="input input-bordered w-full"
                value={formArtikelState.id}
                hidden
                readOnly
              />
            )}
            <label className="form-control w-full">
              <p className="font-bold text-xl mb-2">
                {intl ? intl.profile.editArticle.titleLabel : ""}
              </p>
              <input
                type="text"
                name="judul"
                value={formArtikelState.judul}
                placeholder={
                  intl ? intl.profile.editArticle.titlePlaceholder : ""
                }
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <div className="label">
                <ZodErrors error={formEditState?.zodErrors?.title} />
              </div>
            </label>
            <label className="form-control w-full">
              <p className="font-bold text-xl mb-2">
                {intl ? intl.profile.editArticle.slugLabel : ""}
              </p>
              <label className="input input-bordered flex items-center gap-5 p-0 ps-5">
                {intl ? intl.profile.editArticle.slugFieldLabel : ""}
                <input
                  type="text"
                  name="slug"
                  placeholder={
                    intl ? intl.profile.editArticle.slugPlaceholder : ""
                  }
                  className="input w-full"
                  value={formArtikelState.slug}
                  onChange={handleInputChange}
                  disabled
                />
              </label>
              <div className="label">
                <ZodErrors error={formEditState?.zodErrors?.title} />
              </div>
            </label>
            <label className="form-control w-full">
              <p className="font-bold text-xl mb-1">
                {intl ? intl.profile.editArticle.shortContentLabel : ""}
              </p>
              <p className="text-xs mb-2">
                {intl ? intl.profile.editArticle.shortContentSmallLabel : ""}
              </p>
              <input
                type="text"
                name="short_content"
                placeholder={
                  intl ? intl.profile.editArticle.shorContentPlaceholder : ""
                }
                value={
                  formArtikelState?.short_content
                    ? formArtikelState.short_content
                    : ""
                }
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <div className="label">
                <ZodErrors error={formEditState?.zodErrors?.short_content} />
              </div>
            </label>
            {/* Full Content */}
            <label className="form-control w-full">
              <p className="font-bold text-xl mb-2">
                {intl ? intl.profile.editArticle.contentLabel : ""}
              </p>
              <CustomEditor initialData={formArtikelState.konten} />
              <div className="label">
                <ZodErrors error={formEditState?.zodErrors?.content} />
              </div>
            </label>
          </div>
          <div
            className="
              flex flex-col-reverse md:flex-col 
              w-full md:w-2/5 lg:w-3/12
              gap-5 items-center"
          >
            {/* BUTTON GROUP */}
            <div className="w-full flex flex-col gap-5">
              <Link
                href={`/artikel/preview/${
                  artikelData?.slug ? artikelData.slug : ""
                }`}
                target="_blank"
              >
                <span
                  className="
              w-full
              btn btn-secondary 
              rounded-lg 
              focus:outline-none
              font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl text-white"
                >
                  <RemoveRedEyeIcon />
                  {intl ? intl.profile.editArticle.previewButtonText : ""}
                </span>
              </Link>
              <button
                onClick={() => setIsLoading(true)}
                type="submit"
                className="
                  w-full
                  btn btn-outline btn-secondary
                  rounded-lg 
                  focus:outline-none
                  font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl"
              >
                <SaveIcon />
                {intl ? intl.profile.editArticle.saveButtonText : ""}
              </button>
              <span
                onClick={() =>
                  (
                    document.getElementById(
                      "publish_artikel_modal"
                    ) as HTMLDialogElement
                  ).showModal()
                }
                className="
            w-full
            btn btn-primary
            rounded-lg 
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-lg 2xl:text-xl"
              >
                <PublishIcon />
                {intl ? intl.profile.editArticle.publishButtonText : ""}
              </span>
            </div>
            {/* FORM RIGHT */}
            <div className="w-full flex flex-col gap-5">
              <label className="form-control w-full">
                <p className="font-bold text-xl mb-2">
                  {intl ? intl.profile.editArticle.dateLabel : ""}
                </p>
                <input
                  type="date"
                  placeholder="Type here"
                  name="tanggalUpload"
                  value={convertInputDate(formArtikelState.tanggalUpload)}
                  className="input input-bordered w-full"
                  onChange={handleInputChange}
                />
                <div className="label">
                  <ZodErrors error={formEditState?.zodErrors?.publish_date} />
                </div>
              </label>
              <label className="form-control w-full">
                <p className="font-bold text-xl mb-2">
                  {intl ? intl.profile.editArticle.categoryLabel : ""}
                </p>
                <select
                  name="kategori"
                  value={formArtikelState.kategori.id}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value={""} hidden>
                    {intl ? intl.profile.editArticle.categoryPlaceholder : ""}
                  </option>
                  {kategoriList.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.name}
                    </option>
                  ))}
                </select>
                <div className="label">
                  <ZodErrors error={formEditState?.zodErrors?.kategori_id} />
                </div>
              </label>
              <label className="form-control w-full">
                <p className="font-bold text-xl mb-2">
                  {intl ? intl.profile.editArticle.coverLabel : ""}
                </p>
                <input
                  name="img_cover"
                  accept="image/png, image/jpeg, video/*"
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleSingleFileSelected}
                />
              </label>
              <p
                dangerouslySetInnerHTML={{
                  __html: intl ? intl.profile.editArticle.coverSmallLabel : "",
                }}
              ></p>
              <div className="flex items-center justify-center">
                {formArtikelState.cover?.url && singleImage.length === 0 ? (
                  <Image
                    src={formArtikelState.cover.url}
                    alt="Placeholder"
                    width={400}
                    height={300}
                  />
                ) : singleImage.length > 0 ? (
                  <Image
                    src={URL.createObjectURL(singleImage[0])}
                    alt="Placeholder"
                    width={400}
                    height={300}
                  />
                ) : (
                  <Image
                    src="https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=No+Image"
                    alt="Placeholder"
                    width={400}
                    height={300}
                  />
                )}
              </div>
              <div className="label">
                <ZodErrors error={formEditState?.zodErrors?.img_cover} />
              </div>
            </div>
          </div>
        </div>
      </form>
      <ModalLoadingLite isOpen={isLoading} />
    </div>
  );
}
