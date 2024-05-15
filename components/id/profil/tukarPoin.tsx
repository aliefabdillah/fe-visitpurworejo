"use client";
import React, { useEffect, useState } from "react";
import HadiahItem from "./hadiahItem";
import ShareIcon from "../shareIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import Divider15 from "../divider/divider15";
import { Hadiah } from "@/components/types/hadiah";
import { hadiahService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import EmptyData from "../EmptyData";
import Cookies from "js-cookie";
import TukarPoinmodal from "./tukarPoinmodal";

export default function TukarPoin() {
  const [selectedHadiah, setSelectedHadiah] = useState<any>(null)
  const [hadiahData, setHadiahData] = useState<Hadiah[]>([]);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const userSession = Cookies.get("session");
  const parsedUserSession = JSON.parse(userSession!)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await hadiahService.getHadiah();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const hadiahResult: any[] = response.data;
      const formattedHadiahData: Hadiah[] = hadiahResult.map((hadiah) => {
        return {
          id: hadiah.id,
          name: hadiah.attributes.name,
          description: hadiah.attributes.description,
          redeem_points: hadiah.attributes.redeem_point,
          image: hadiah.attributes.image.data?.attributes.url,
        };
      });
      setHadiahData(formattedHadiahData);
    }
  };

  const handleModalClose = () => {
    setSelectedHadiah(null);
  };

  const getSelectedHadiah = (hadiahData: Hadiah) => {
    setSelectedHadiah(hadiahData)
  }

  return (
    <div className="flex flex-row my-6 gap-6">
      <div className="flex flex-col w-11/12">
        <h1 className="text-3xl font-extrabold">Hadiah yang dapat ditukar:</h1>
        {hadiahData.length ? (
          <>
            {hadiahData.map((hadiahItem, index) => (
              <HadiahItem key={index} hadiah={hadiahItem} getSelectedHadiah={getSelectedHadiah}/>
            ))}
          </>
        ) : (
          <div className="mt-12">
            <EmptyData halaman="Hadiah" />
          </div>
        )}
      </div>
      <div className="flex flex-col shadow-2xl p-7 w-4/12 h-fit">
        <div>
          <h1 className="text-3xl font-extrabold mb-3">Highlights</h1>
          <p className="text-xl mb-3">Point Kamu: {parsedUserSession.point}</p>
          <p className="text-xl mb-3">Total Hadiah: {hadiahData.length}</p>
          <a href="/" className="mr-2">
            <FacebookIcon sx={{ color: "#3D649F", fontSize: 30 }} />
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
                fontSize: 25,
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
                fontSize: 25,
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
              sx={{ color: "#FFFFFF", fontSize: 25 }}
            />
          </a>
          <a href="/">
            <LinkIcon
              style={{
                background: "#636364",
                borderRadius: "20%",
                padding: "5px",
              }}
              sx={{ color: "#FFFFFF", fontSize: 25 }}
            />
          </a>
        </div>
        <Divider15 />
        <div>
          <h1 className="text-2xl font-extrabold mb-3">Tukar Poin FAQs</h1>
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index}>
              <h3 className="text-xl font-bold">
                Lorem ipsum dolor sit amet consectetur.
              </h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur. Erat amet nunc congue
                laoreet mauris. Non a risus volutpat
              </p>
            </span>
          ))}
        </div>
      </div>
      <TukarPoinmodal hadiah={selectedHadiah} onClose={handleModalClose} userSession={parsedUserSession}/>
    </div>
  );
}
