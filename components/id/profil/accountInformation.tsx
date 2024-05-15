"use client";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { User } from "@/components/types/user";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { userService } from "@/app/data/services";
import Image from "next/image";

export default function AccountInformation() {
  const [userData, setUserData] = useState<User>();
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const [profileCompletion, setProfileCompletion] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await userService.getMe();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const userResult: any = response;
      console.log(response)
      const formattedUserData: User = {
        id: userResult?.id,
        username: userResult?.username,
        email: userResult?.email,
        confirmed: userResult?.confirmed,
        blocked: userResult?.blocked,
        isAdmin: userResult?.isAdmin,
        isActive: userResult?.isActive,
        fullname: userResult?.fullname,
        hometown: userResult?.hometown,
        points: userResult?.point,
        img_profile: {
          url: userResult?.img_profile?.url,
          name: userResult?.img_profile?.name,
        },
        ulasan: userResult?.ulasan_id?.map((ulasan: any) => ({
          id: ulasan.id,
          content: ulasan.content,
          isDeleted: ulasan.isDeleted,
        })),
        phone: userResult?.phone,
      };
      setUserData(formattedUserData);
      setProfileCompletion(calculateProfileCompletion(formattedUserData));
    }
  };

  const calculateProfileCompletion = (user: User): number => {
    const fields = [
      user.username,
      user.img_profile?.url,
      user.fullname,
      user.phone,
      user.hometown,
      user.email,
    ];

    const filledFields = fields.filter(Boolean).length;
    const totalFields = fields.length;

    return (filledFields / totalFields) * 100;
  };

  const filteredUlasan =
    userData?.ulasan?.filter((ulasan) => !ulasan.isDeleted) || [];

  const date = new Date();
  const hour = date.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Selamat Pagi";
  } else if (hour < 18) {
    greeting = "Selamat Siang";
  } else if (hour < 20) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  return (
    <div className="my-8 flex flex-row items-center gap-4">
      <div className="w-64 rounded-full mr-4">
        <Image
          alt="Image profile"
          suppressHydrationWarning
          width={1200}
          height={1200}
          src={
            userData?.img_profile?.url
              ? userData.img_profile.url
              : `https://avatar.iran.liara.run/username?username=${userData?.username}`
          }
        />
      </div>
      <div className="flex flex-col w-full">
        <div
          className="
          flex flex-col md:flex-row 
          justify-between md:items-center
          mb-4 md:mb-7"
        >
          <h1
            className="
              text-primary text-3xl xl:text-5xl 
              font-extrabold
              mb-2 md:mb-0
            "
          >
            {`${greeting},`}
            <br />
            <span className="pt-3 block">
              {userData?.fullname ? userData.fullname : "-"}
            </span>
          </h1>

          <p className="font-medium text-xl">
            Point: {userData?.points ? userData.points.toString() : "0"} |
            Ulasan {filteredUlasan.length}
          </p>
        </div>
        <div
          className="
          flex flex-col md:flex-row 
          gap-5 md:gap-0
          justify-between"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl">
              {profileCompletion < 100
                ? "Profil kamu belum lengkap nih!"
                : "Yay! Profil kamu sudah lengkap!"}
            </p>
            <div className="font-bold text-xl">
              <progress
                className="progress progress-primary w-4/5 md:w-56 h-4 mr-4"
                value={profileCompletion}
                max="100"
              ></progress>
              {profileCompletion}%
            </div>
          </div>
          <Link
            href={`/profil/edit-profil/${
              userData?.username ? userData.username : "-"
            }`}
          >
            <button
              className="
              w-full md:w-fit
              btn
              rounded-lg 
              bg-gradient-to-l from-accent from-10% to-secondary to-90%
              hover:from-yellow-500 hover:to-orange-500
              focus:outline-none
              text-white font-bold text-xs lg:text-md xl:text-xl"
            >
              Edit Profil
              <ArrowForwardIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
