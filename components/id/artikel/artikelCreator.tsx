/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/components/lib/formatter";
import { Artikel } from "@/components/types/artikel";
import Image from "next/image";
import React from "react";

export default function ArtikelCreator({
  artikelData,
}: {
  artikelData?: Artikel;
}) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap flex-row items-center">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img
            src={
              artikelData?.uploader?.img_profile
                ? artikelData.uploader.img_profile
                : `https://avatar.iran.liara.run/username?username=${
                    artikelData?.uploader?.name ? artikelData.uploader.name : ""
                  }`
            }
            alt="profile image"
          />
        </div>
      </div>
      <div className="xs:ml-0 sm:ml-6">
        <p className="text-3xl font-extrabold">{artikelData?.uploader?.name}</p>
        <p className="font-normal">
          {formatDate(
            artikelData?.tanggal_upload ? artikelData.tanggal_upload : ""
          )}
        </p>
      </div>
    </div>
  );
}
