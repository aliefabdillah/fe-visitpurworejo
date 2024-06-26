/* eslint-disable @next/next/no-img-element */
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { Wisata } from "@/components/types/wisata";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ModalGallery({
  galleryData,
  onClose,
}: {
  galleryData?: Wisata;
  onClose?: () => void;
}) {
  const handleBackButtonState = () => {
    if (onClose) {
      onClose();
    }
  };

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

  return (
    <dialog id="gallery_modal" className="modal modal-middle">
      <div className="modal-box p-0 max-w-130">
        <form method="dialog">
          <button
            onClick={handleBackButtonState}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {/* <h3 className="font-bold text-lg">Hello!</h3> */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/4">
            <Image
              width={1500}
              height={1500}
              src={
                galleryData?.img_cover?.url
                  ? galleryData.img_cover.url
                  : "https://placehold.jp/120/EEEEEE/D0D0D0/900x600.png?text=..."
              }
              alt="Wisata Image"
              className="basis-6/12 h-64 md:h-100 md:object-cover object-fit w-screen md:w-full"
            />
          </div>
          <div className="flex-col w-full p-8 basis-6/12 text-wrap">
            <p className="mb-3 text-4xl font-extrabold overflow-hidden">
              {galleryData?.name}
            </p>
            <div
              className="font-normal text-xl mb-3 prose line-clamp-5 lg:line-clamp-4 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: galleryData?.deskripsi ? galleryData.deskripsi : "",
              }}
            />
            <Link href={`/destinasi/${galleryData?.slug}`}>
              <button className="btn btn-sm btn-secondary text-white w-full">
                {intl ? intl.gallery.buttonText : ""}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
}
