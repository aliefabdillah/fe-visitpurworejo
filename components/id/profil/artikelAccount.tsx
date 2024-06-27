import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArtikelList from "../artikel/artikelList";
import Divider15 from "../divider/divider15";
import CreateArtikelModal from "./createArtikelModal";
import { ArtikelHero } from "@/components/types/artikel";
import Cookies from "js-cookie";
import { decryptUserId } from "@/components/lib/crypto";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ArtikelAccount() {
  const [statusValue, setStatusValue] = useState("draft");
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-start my-5 gap-4 md:gap-0">
        <select
          className="select select-bordered w-full sm:w-fit text-lg"
          defaultValue={"draft"}
          onChange={handleStatusChange}
        >
          <option value={"published"}>Published</option>
          <option value={"draft"}>Draft</option>
          <option value={"verification"}>Verification</option>
        </select>
        <div className="flex flex-row items-center justify-between sm:justify-start gap-4 w-full sm:w-fit">
          <Link
            href={{
              pathname: "/artikel/petunjuk-menulis-artikel-di-visitpurworejo",
              query: {
                lang: lang ? lang : "id",
              },
            }}
          >
            <button
              className="btn btn-info
            rounded-lg 
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-lg"
            >
              {" "}
              {intl ? intl.profile.accountData.articleTab.buttonGuidelinesText : ""}
              <QuestionMarkIcon/>
            </button>
          </Link>
          <button
            className="
            btn btn-primary
            rounded-lg 
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-lg"
            onClick={() =>
              (
                document.getElementById(
                  "create_artikel_modal"
                )! as HTMLDialogElement
              ).showModal()
            }
          >
            {intl ? intl.profile.accountData.articleTab.buttonText : ""}
            <AddIcon />
          </button>
        </div>
        <CreateArtikelModal />
      </div>
      <ArtikelList editPage={true} status={statusValue} />
    </div>
  );
}
