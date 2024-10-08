"use client";
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import CtaWide from "@/components/id/cta/ctaWide";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import IntroSection from "@/components/id/introSection";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import Pagination from "@/components/id/pagination";
import { Kategori } from "@/components/types/kategori";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { kategoriService } from "../data/services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

const textIntroId = "Selamat datang di halaman daftar artikel kami! Di sini Anda dapat menemukan berbagai artikel menarik yang membahas berbagai topik yang relevan dan informatif mengenai pariwisata di Kabupaten Purworejo. Dari tips dan trik, panduan, hingga berita terbaru, kami berusaha menyajikan konten yang bermanfaat dan inspiratif untuk Anda. Jelajahi daftar artikel kami dan temukan informasi seputar pariwisata Kabupaten Purworejo yang Anda butuhkan!"

export default function ArtikelPage() {
  const queryClient = new QueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [kategoriValue, setKategoriValue] = useState("");
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const query = searchParams.get('lang')
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, pathname, router, searchParams]);
  
  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    const response = await kategoriService.getListKategori();
    if (response.data) {
      const kategoriResult: any[] = response.data;
      const formatedKategoriData: Kategori[] = kategoriResult.map(
        (item: any) => {
          return {
            id: item.id.toString(),
            name: item.attributes.name,
            slug: item.attributes.slug,
          };
        }
      );
      setKategoriList(formatedKategoriData);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "search") {
      setSearchValue(value);
    } else {
      setKategoriValue(value);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavbarWhite />
        <div className="flex flex-col min-h-screen items-center">
          {/* BREADCUMBS */}
          <div
            className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 mt-16 mb-4
            
          "
          >
            <NavBreadcumbs level1={"Artikel"} />
          </div>
          {/* INTRO */}
          <div
            className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2
            
          "
          >
            <IntroSection title={intl ? intl.article.title : ""} body={intl ? intl.article.intro : ""} />
          </div>
          <Divider15 />
          {/* List Article */}
          <div
            className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-2 my-6
            flex flex-col
          "
          >
            <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-8 gap-4 md:gap-0">
              <select
                name="kategori"
                className="select text-lg select-bordered w-full sm:w-fit overflow-y-auto"
                onChange={handleInputChange}
              >
                <option value={""}>
                  {intl ? intl.article.defaultCategory : ""}
                </option>
                {kategoriList.map((kategori, index) => (
                  <option key={index} value={kategori.slug}>
                    {kategori.name}
                  </option>
                ))}
              </select>
              <div className="join min-w-full sm:min-w-fit">
                <input
                  type="text"
                  name="search"
                  className="input input-bordered w-full sm:w-fit"
                  placeholder={intl ? intl.article.searchPlaceholder : ""}
                  onChange={handleInputChange}
                />
                <button className="btn btn-secondary join-item rounded-lg">
                  <SearchIcon sx={{ color: "#FFFFFF" }} />
                </button>
              </div>
            </div>
            <ArtikelList isListPage={true} category={kategoriValue} searchValue={searchValue} />
            {/* <Pagination /> */}
          </div>
        </div>
        <Divider15 />
        <CtaWide />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
