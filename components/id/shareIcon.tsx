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
    <div className="flex flex-col gap-1">
      <p className="text-2xl">Bagikan:</p>
      <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-1">
        <FacebookShare
          url={currentUrl}
          quote={pageTitle}
          round
          size={50}
          hashtag={noSpaceString}
        />
        <TwitterShare
          url={currentUrl}
          title={pageTitle}
          hashtags={[`${noSpaceString}`, "artikelWisata", "wisatapurworejo", "purworejo"]}
          round
          size={50}
        />
        <WhatsappShare
          url={currentUrl}
          title={pageTitle}
          separator=":: "
          round
          size={50}
        />
        <TelegramShare url={currentUrl} round size={50} />
        <FacebookMessengerShare
          url={currentUrl}
          redirectUri={currentUrl}
          appId={process.env.APP_ID ? process.env.APP_ID : ""}
          round
          size={50}
        />
        <PinterestShare url={currentUrl} media={pageTitle} round size={50} />

        {/* <a href="/" className="mr-2">
          <FacebookIcon sx={{ color: "#3D649F", fontSize: 55 }} />
        </a>
        <a href="/" className="mr-3">
          <TwitterIcon
            style={{
              backgroundColor: "#41AEDC",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{
              color: "#FFFFFF",
              fontSize: 45,
            }}
          />
        </a>
        <a href="/" className="mr-3">
          <InstagramIcon
            style={{
              background: "linear-gradient(45deg, #f7b733, #8a3ab9)",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{
              color: "#FFFFFF",
              fontSize: 45,
            }}
          />
        </a>
        <a href="/" className="mr-3">
          <WhatsAppIcon
            style={{
              background: "#089E39",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a>
        <a href="/" className="mr-3">
          <MailIcon
            style={{
              background: "#A21C1C",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a>
        <a href="/">
          <LinkIcon
            style={{
              background: "#636364",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a> */}
      </div>
    </div>
  );
}
