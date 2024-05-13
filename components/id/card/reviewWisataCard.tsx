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
    <div className="card w-full bg-primary shadow-2xl">
      <div className="card-body text-white text-ellipsis">
        <p className="line-clamp-4 xl:line-clamp-none">
          {reviewWisata?.content}
        </p>
        <div className="flex flex-wrap md:flex-nowrap flex-row items-center mt-7">
          <div className="avatar">
            <div className="w-24 rounded-full">
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
          <p className="ml-4 text-xl font-extrabold">
            Oleh {reviewWisata?.user_id?.username}
            <br />
            <span className="font-normal">{reviewWisata?.user_id?.hometown ? reviewWisata?.user_id?.hometown : "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
