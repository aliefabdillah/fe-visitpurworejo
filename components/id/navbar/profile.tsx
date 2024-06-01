/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import RedeemIcon from "@mui/icons-material/Redeem";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAction } from "@/app/data/action/auth";
import ModalLoading from "@/components/Loader/ModalLoading";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

export default function profile({ color }: { color: string }) {
  const [loading, setLoading] = useState(false);
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [profile, setProfile] = useState({
    url: "",
    name: "",
    point: "",
  });
  const lang = searchParams.get("lang");
  const langCookies = `lang=${Cookies.get("lang") || lang}`
  
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const langDict: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(langDict);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  useEffect(() => {
    setProfile({
      url: parsedUserSession?.img_profile?.url,
      point: parsedUserSession?.point,
      name: parsedUserSession?.username,
    });

    if (pathName === "/wisata") {
      const searchQuery = searchParams.get("search");
      router.replace(`${pathName}?${langCookies}&search=${searchQuery}`);
    } else if (pathName === "/profil"){
      const tabParams = searchParams.get("tab");
      router.replace(`${pathName}?${langCookies}&tab=${tabParams || ""}`);
    } else {
      router.replace(`${pathName}?${langCookies}`);
    }
  }, [langCookies, parsedUserSession?.img_profile?.url, parsedUserSession?.point, parsedUserSession?.username, pathName, router, searchParams]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Lakukan proses logout
      await logoutAction();
      // Setelah proses logout selesai, atur loading kembali menjadi false
      // (document.getElementById("logout_modal") as HTMLDialogElement).close();
      setLoading(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {!profile.name ? (
        <>
          <Link
            href={{
              pathname: "/auth/login",
              query: { lang: lang },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-10 h-10 ${color}`}
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </>
      ) : (
        <>
          <div className="flex">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:!bg-primary"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    suppressHydrationWarning
                    width={120}
                    height={120}
                    src={
                      !profile.url
                        ? `https://avatar.iran.liara.run/username?username=${profile.name}`
                        : profile.url
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={{ pathname: "/profil", query: {lang: lang, tab: "wisataFavorit"}}} className="active:!bg-primary">
                    <PersonIcon />
                    {intl ? intl.navbarProfile.profileText : ""}
                  </Link>
                </li>
                <li>
                  <a className="active:!bg-primary">
                    <RedeemIcon />
                    {profile.point} {intl ? intl.navbarProfile.pointText : ""}
                  </a>
                </li>
                <li>
                  <a className="active:!bg-primary" onClick={handleLogout}>
                    <LogoutIcon />
                    {intl ? intl.navbarProfile.logoutText : ""}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ModalLoading isOpen={loading} />
        </>
      )}
    </>
  );
}
