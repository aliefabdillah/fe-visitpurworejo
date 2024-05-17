/* eslint-disable @next/next/no-img-element */
import { Ulasan } from "@/components/types/ulasan";
import { Wisata } from "@/components/types/wisata";
import React from "react";

export default function ReviewWisataCard({
  reviewWisata,
}: {
  reviewWisata?: Ulasan;
}) {
  return (
    <div className="card w-full h-80 bg-primary shadow-2xl">
      <div className="card-body text-white">
        <p className="text-wrap break-words truncate line-clamp-5">
          {reviewWisata?.content}
        </p>
        <div className="flex flex-nowrap flex-row items-center mt-7">
          <div className="avatar">
            <div className="w-10 md:w-24 rounded-full">
              <img
                src={
                  reviewWisata?.user_id?.img_profile?.url
                    ? reviewWisata.user_id.img_profile.url
                    : `https://avatar.iran.liara.run/username?username=${reviewWisata?.user_id?.username}`
                }
                alt="Avatar User"
              />
            </div>
          </div>
          <p className="md:ml-4 text-md md:text-xl font-extrabold">
            Oleh {reviewWisata?.user_id?.username}
            <br />
            <span className="font-normal">{reviewWisata?.user_id?.hometown ? reviewWisata?.user_id?.hometown : "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
