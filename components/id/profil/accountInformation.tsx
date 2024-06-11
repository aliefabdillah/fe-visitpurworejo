"use client";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { User } from "@/components/types/user";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { userService } from "@/app/data/services";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import ToastError from "../response/ToastResponse";

export default function AccountInformation() {
  const [isLoading, setIsloading] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const [profileCompletion, setProfileCompletion] = useState<number>(0);

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
    loadData();
  }, []);

  const loadData = async () => {
    setIsloading(true);
    const response = await userService.getMe();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
      setIsToastOpen(true);
    } else {
      const userResult: any = response;
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
      setIsloading(false);
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

    const completionPercentage = (filledFields / totalFields) * 100;

    // Membatasi hasil menjadi satu angka di belakang koma
    return parseFloat(completionPercentage.toFixed(1));
  };

  const filteredUlasan =
    userData?.ulasan?.filter((ulasan) => !ulasan.isDeleted) || [];

  const date = new Date();
  const hour = date.getHours();
  let greeting;

  if (hour < 12) {
    greeting = intl ? intl.profile.accountInformation.greetingMorning : "";
  } else if (hour < 18) {
    greeting = intl ? intl.profile.accountInformation.greetingNoon : "";
  } else if (hour < 20) {
    greeting = intl ? intl.profile.accountInformation.greetingAfternoon : "";
  } else {
    greeting = intl ? intl.profile.accountInformation.greetingNight : "";
  }

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div className="my-8 flex flex-col sm:flex-row items-center gap-4">
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      {isLoading ? (
        <div className="skeleton w-52 h-52 mr-4 border-4 border-gray-300 rounded-full shrink-0"></div>
      ) : (
        <div className="w-64 h-64 sm:w-56 sm:h-40 lg:w-64 lg:h-52 rounded-full mr-4 border-4 border-gray-300">
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
            className="w-full h-full rounded-full"
          />
        </div>
      )}
      <div className="flex flex-col w-full">
        <div
          className="
          flex flex-col md:flex-row 
          justify-between md:items-center
          mb-4 md:mb-7"
        >
          {isLoading ? (
            <div className="skeleton h-10 w-1/2"></div>
          ) : (
            <h1
              className="
              text-center sm:text-left
              text-primary text-3xl xl:text-5xl 
              font-extrabold
              mb-2 md:mb-0
            "
            >
              {/* {`${greeting},`} */}
              {/* <br /> */}
              <span className="pt-3 block">
                {greeting}, {userData?.fullname ? userData.fullname : "-"}
              </span>
            </h1>
          )}

          {isLoading ? (
            <div className="skeleton h-6 w-44"></div>
          ) : (
            <p className="font-medium text-xl">
              {intl ? intl.profile.accountInformation.pointText : ""}:{" "}
              {userData?.points ? userData.points.toString() : "0"} |{" "}
              {intl ? intl.profile.accountInformation.reviewText : ""}:{" "}
              {filteredUlasan.length}
            </p>
          )}
        </div>
        <div
          className="
          flex flex-col md:flex-row 
          gap-5 md:gap-0
          justify-between"
        >
          {isLoading ? (
            <div className="skeleton mt-4 h-6 w-1/3"></div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xl">
                {profileCompletion < 100
                  ? intl ? intl.profile.accountInformation.profileIncompleteText : ""
                  : intl ? intl.profile.accountInformation.profileCompleteText : ""}
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
          )}
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
              {intl ? intl.profile.accountInformation.buttonText : ""}
              <ArrowForwardIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
