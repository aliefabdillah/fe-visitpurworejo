import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArtikelList from "../artikel/artikelList";
import Divider15 from "../divider/divider15";
import CreateArtikelModal from "./createArtikelModal";
import { ArtikelHero } from "@/components/types/artikel";
import Cookies from "js-cookie";
import { decryptUserId } from "@/components/lib/crypto";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

export default function ArtikelAccount() {
  const [statusValue, setStatusValue] = useState('draft');
  const searchParams = useSearchParams()
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

  const  handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value)
  }
  
  return (
    <div>
      <div className="flex flex-row justify-between items-center my-5">
        <select className="select select-bordered w-fit text-lg" defaultValue={'draft'} onChange={handleStatusChange}>
          <option value={'published'}>Published</option>
          <option value={'draft'}>Draft</option>
          <option value={'verification'}>Verification</option>
        </select>
        <button
          className="
          btn btn-primary
          rounded-lg 
          focus:outline-none
          text-white font-bold text-xs lg:text-md xl:text-xl"
          onClick={() =>
            (
              document.getElementById("create_artikel_modal")! as HTMLDialogElement
            ).showModal()
          }
        >
          {intl ? intl.profile.accountData.articleTab.buttonText: ""}
          <AddIcon />
        </button>
        <CreateArtikelModal/>
      </div>
      <ArtikelList editPage={true} status={statusValue}/>
    </div>
  );
}
