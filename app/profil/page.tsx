import Footer from "@/components/id/footer";
import NavbarWhite from "@/components/id/navbar/navbarWhite";
import AccountData from "@/components/id/profil/accountData";
import AccountInformation from "@/components/id/profil/accountInformation";
import React from "react";

export default function ProfilPage() {
  return (
    <div>
      <NavbarWhite />
      <div className="flex flex-col min-h-screen items-center">
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mt-16 mb-4
            
          "
        >
          <AccountInformation />
        </div>
        <div
          className="
            w-screen sm:w-106 md:w-120 lg:w-130 xl:w-148 2xl:w-164
            px-11 mb-4
            
          "
        >
          <AccountData/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
