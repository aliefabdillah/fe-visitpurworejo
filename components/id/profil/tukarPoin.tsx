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
import Loading from "@/components/Loader/Loading";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import ToastError from "../response/ToastResponse";

export default function TukarPoin() {
  const [selectedHadiah, setSelectedHadiah] = useState<any>(null);
  const [hadiahData, setHadiahData] = useState<Hadiah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
  const userSession = Cookies.get("session");
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
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
    setIsLoading(true);
    const response = await hadiahService.getHadiah();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
      setIsToastOpen(true);
    } else {
      const hadiahResult: any[] = response.data;
      const formattedHadiahData: Hadiah[] = hadiahResult.map((hadiah) => {
        return {
          id: hadiah.id,
          name: hadiah.attributes.name,
          description: hadiah.attributes.description,
          redeem_points: hadiah.attributes.redeem_point,
          lokasi_redeem: hadiah.attributes.location,
          stock: hadiah.attributes.stock,
          image: hadiah.attributes.image.data?.attributes.url,
        };
      });
      setHadiahData(formattedHadiahData);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setSelectedHadiah(null);
  };

  const getSelectedHadiah = (hadiahData: Hadiah) => {
    setSelectedHadiah(hadiahData);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <>
      <ToastError
        error={strapiError}
        classname="alert-error"
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <div className="flex flex-col lg:flex-row my-6 gap-6">
        <div className="flex flex-col w-full lg:w-11/12">
          <h1 className="text-3xl font-extrabold">
            {intl ? intl.profile.accountData.redeemTab.intro : ""}:
          </h1>
          {isLoading ? (
            <div className="flex justify-center my-6">
              <Loading />
            </div>
          ) : hadiahData.length ? (
            <>
              {hadiahData.map((hadiahItem, index) => (
                <HadiahItem
                  key={index}
                  hadiah={hadiahItem}
                  getSelectedHadiah={getSelectedHadiah}
                />
              ))}
            </>
          ) : (
            <div className="mt-12">
              <EmptyData
                halaman={intl ? intl.profile.accountData.redeemTab.title2 : ""}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col shadow-2xl p-7 w-full lg:w-4/12 h-fit">
          <div>
            <h1 className="text-3xl font-extrabold mb-3">
              {intl ? intl.profile.accountData.redeemTab.highlightText : ""}
            </h1>
            <p className="text-xl mb-3">
              {intl ? intl.profile.accountData.redeemTab.pointAccountText : ""}:{" "}
              {parsedUserSession.point}
            </p>
            <p className="text-xl">
              {intl ? intl.profile.accountData.redeemTab.giftText : ""}:{" "}
              {hadiahData.length}
            </p>
          </div>
          <Divider15 />
          <div>
            <h1 className="text-2xl font-extrabold mb-3">
              {intl ? intl.profile.accountData.redeemTab.titleFAQ : ""}
            </h1>
            {intl ? intl.redeemPointsFaqs.map((item: any, index: any) => (
              <span key={index}>
                <h3 className="text-xl font-bold">
                  {item.question}
                </h3>
                <p className="mb-4 text-justify">
                  {item.answer}
                </p>
              </span>
            )) : []}
          </div>
        </div>
        <TukarPoinmodal
          hadiah={selectedHadiah}
          onClose={handleModalClose}
          userSession={parsedUserSession}
        />
      </div>
    </>
  );
}
