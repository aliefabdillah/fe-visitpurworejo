import ResetPasswordForm from "@/components/id/form/resetPasswordForm";
import Image from "next/image";
import React from "react";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        width={1200}
        height={1200}
        src="/hero-auth.svg"
        alt="Welcome Iamge"
        className="h-96 w-screen object-cover mb-10 xl:w-1/2 xl:h-screen xl:mb-0"
      />
      <div className="w-full h-auto xl:w-1/2 flex items-center justify-center">
        {/* FORM */}
        <ResetPasswordForm/>
      </div>
    </div>
  );
}
