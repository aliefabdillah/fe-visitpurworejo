"use client";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import LinkIcon from "@mui/icons-material/Link";
import {
  FacebookMessengerShare,
  FacebookShare,
  PinterestShare,
  TelegramShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";
import { useSearchParams } from "next/navigation";
import { createSlug } from "../lib/slug";

export default function ShareIcon({ pageTitle }: { pageTitle: string}) {
  const [currentUrl, setCurrentUrl] = useState("");
  let noSpaceString = ""
  if (pageTitle) {
    noSpaceString = pageTitle.replace(/\s+/g, '');
  }

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-xl md:text-2xl">Bagikan:</p>
      <div className="grid grid-cols-6 md:grid-cols-6 items-center gap-2">
        <FacebookShare
          url={currentUrl}
          quote={pageTitle}
          round
          size={30}
          hashtag={noSpaceString}
        />
        <TwitterShare
          url={currentUrl}
          title={pageTitle}
          hashtags={[`${noSpaceString}`, "artikelWisata", "wisatapurworejo", "purworejo"]}
          round
          size={30}
        />
        <WhatsappShare
          url={currentUrl}
          title={pageTitle}
          separator=":: "
          round
          size={30}
        />
        <TelegramShare url={currentUrl} round size={30} />
        <FacebookMessengerShare
          url={currentUrl}
          redirectUri={currentUrl}
          appId={process.env.APP_ID ? process.env.APP_ID : ""}
          round
          size={30}
        />
        <PinterestShare url={currentUrl} media={pageTitle} round size={30} />
      </div>
    </div>
  );
}
