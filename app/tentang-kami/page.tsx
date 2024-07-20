"use client";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import HeroImage from "@/components/id/hero/hero-image";
import IntroSection from "@/components/id/introSection";
import NavbarGreen from "@/components/id/navbar/navbarGreen";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const templateBody = `VisitPurworejo adalah website resmi pariwisata Kabupaten Purworejo yang dikelola oleh Dinas Pariwisata dan Kebudayaan Kabupaten Purworejo. Website ini bertujuan untuk mempromosikan pariwisata Purworejo dan memberikan kemudahan bagi wisatawan untuk mendapatkan informasi yang mereka butuhkan.
<br>
Visi:
<br>
Menjadikan Purworejo sebagai destinasi wisata unggulan di Jawa Tengah yang dikenal dengan keindahan alam, budaya, dan keramahan penduduknya.
<br>
Misi:
<br>
1. Meningkatkan kesadaran masyarakat tentang potensi wisata di Purworejo.<br>
2. Mengembangkan dan mempromosikan destinasi wisata di Purworejo. <br>
3. Meningkatkan kualitas pelayanan wisata di Purworejo.<br>
4. Meningkatkan jumlah wisatawan yang berkunjung ke Purworejo.
<br>
VisitPurworejo menyediakan berbagai informasi tentang:
<br>
- Destinasi wisata: Pantai, gunung, air terjun, candi, dan lain-lain.<br>
- Akomodasi: Hotel, homestay, guest house, dan lain-lain.<br>
- Kuliner: Makanan khas Purworejo, restoran, dan kafe.<br>
- Event: Festival, pameran, dan pertunjukan.<br>
- Informasi lain: Transportasi, peta, dan tips wisata.
<br>
VisitPurworejo berkomitmen untuk memberikan informasi yang akurat, terkini, dan bermanfaat bagi wisatawan. Kami terus berusaha untuk meningkatkan kualitas website dan layanan kami agar dapat memberikan pengalaman terbaik bagi para pengunjung website ini.
<br>
Mari bersama-sama kita bangun pariwisata Purworejo dengan mengunjungi VisitPurworejo dan mendapatkan informasi yang Anda butuhkan untuk merencanakan perjalanan Anda ke Purworejo!`

export default function TentangKamiPage() {
  const queryClient = new QueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, pathname, router, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavbarGreen />
        <HeroImage singleImage="/about-us-image.jpg" />
        <div className="flex flex-col min-h-screen items-center">
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
          >
            <NavBreadcumbs level1={"Tentang Kami"} level2="VisitPurworejo" />
          </div>
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2
              
            "
          >
            <IntroSection
              title={"VisitPurworejo"}
              body={intl ? intl.about.content : ""}
              titleClass={"text-5xl md:text-7xl lg:text-8xl mb-8"}
            />
          </div>
          <Divider15 />
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 mt-8 mb-12
              flex flex-col
            "
          >
            <h1
              className="
                text-primary font-extrabold text-4xl
                mb-8
              "
            >
              {intl ? intl.about.rekomendasiWisata : ""}
            </h1>
            <ArtikelList limit={3} />
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
