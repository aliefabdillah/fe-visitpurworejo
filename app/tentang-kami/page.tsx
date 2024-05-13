"use client"
import ArtikelList from "@/components/id/artikel/artikelList";
import NavBreadcumbs from "@/components/id/breadcumbs/navBreadcumbs";
import Divider15 from "@/components/id/divider/divider15";
import Footer from "@/components/id/footer";
import HeroImage from "@/components/id/hero/hero-image";
import IntroSection from "@/components/id/introSection";
import NavbarGreen from "@/components/id/navbar/navbarGreen";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const templateBody = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)
<br>
is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
<br>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`

export default function TentangKamiPage() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>

      <div>
        <NavbarGreen />
        <HeroImage />
        <div className="flex flex-col min-h-screen items-center">
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2 my-6
              
            "
          >
            <NavBreadcumbs level1={"Tentang"} level2="VisitPurworejo"/>
          </div>
          <div
            className="
              w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
              px-2
              
            "
          >
            <IntroSection title={"VisitPurworejo"} body={templateBody} titleClass={"text-5xl md:text-7xl lg:text-8xl mb-8"}/>
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
              Rekomendasi Untukmu
            </h1>
            <ArtikelList limit={3}/>
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
