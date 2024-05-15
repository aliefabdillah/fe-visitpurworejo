"use state";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { Ulasan } from "@/components/types/ulasan";
import { ulasanService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import EmptyData from "../EmptyData";
import { formatDate } from "@/components/lib/formatter";
import Image from "next/image";

export default function UlasanAccount() {
  const [ulasanAccountData, setUlasanAccountData] = useState<Ulasan[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await ulasanService.getUlasanAccount();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const ulasanAccountResult: any[] = response.data;
      const formattedUlasanAccountData: Ulasan[] = ulasanAccountResult.map(
        (ulasanAccount) => {
          return {
            id: ulasanAccount.id,
            content: ulasanAccount.content,
            posting_date: ulasanAccount.posting_date,
            user_id: {
              id: ulasanAccount.user_id.id,
              username: ulasanAccount.user_id.username,
              img_profile: {
                url: ulasanAccount.img_profile?.url,
                name: ulasanAccount.img_profile?.name,
              },
            },
            wisata: {
              id: ulasanAccount.post_wisata_id?.id,
              name: ulasanAccount.post_wisata_id?.name,
              slug: ulasanAccount.post_wisata_id?.slug,
              jenis_wisata: ulasanAccount.post_wisata_id?.jenis_wisata,
            },
            child_comment: ulasanAccount.child_comment,
          };
        }
      );

      setUlasanAccountData(formattedUlasanAccountData);
    }
  };

  const filteredChildUlasan = ulasanAccountData.flatMap((ulasan) => 
    ulasan.child_comment?.filter((child) => !child.isDeleted) || []
  );
  


  return (
    <>
      {ulasanAccountData.length ? (
        ulasanAccountData.map((ulasanAccount) => (
          <div
            key={ulasanAccount.id}
            className="my-6 shadow-2xl p-8 rounded-lg"
          >
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="flex flex-row items-center gap-3">
                <p className="text-4xl font-extrabold">
                  {ulasanAccount.wisata?.name}
                </p>
                <RemoveIcon />
                <p className="text-2xl">
                  {filteredChildUlasan.length
                    ? filteredChildUlasan.length
                    : "0"}
                  &nbsp;Comments
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-20 rounded-full mr-2">
                  <Image
                    alt="Image profile"
                    suppressHydrationWarning
                    width={1200}
                    height={1200}
                    src={
                      ulasanAccount?.user_id?.img_profile?.url
                        ? ulasanAccount.user_id.img_profile.url
                        : `https://avatar.iran.liara.run/username?username=${ulasanAccount.user_id?.username}`
                    }
                  />
                </div>
                {/* <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} /> */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-2xl font-bold">
                      {ulasanAccount.user_id?.username}
                    </p>
                    <RemoveIcon />
                    <p className="text-xl">
                      {formatDate(
                        ulasanAccount.posting_date
                          ? ulasanAccount.posting_date
                          : ""
                      )}
                    </p>
                  </div>
                  <p className="line-clamp-3 lg:line-clamp-none">
                    {ulasanAccount.content}
                  </p>
                  <Link
                    href={`/${ulasanAccount.wisata?.jenis_wisata}/${ulasanAccount.wisata?.slug}`}
                  >
                    <button className="w-fit font-extralight">
                      <ChevronRightIcon />
                      Lihat Ulasan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyData halaman="Ulasan" />
      )}
    </>
  );
}
