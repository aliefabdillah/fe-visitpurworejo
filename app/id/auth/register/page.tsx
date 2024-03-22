import RegisterForm from "@/components/form/registerForm";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-auth.svg"
        alt="Welcome Iamge"
        className="h-96 w-screen object-cover mb-10 xl:w-1/2 xl:h-screen xl:mb-0"
      />
      <div className="w-full h-auto xl:w-1/2 flex items-center justify-center">
        {/* FORM */}
        <RegisterForm />
      </div>
    </div>
  );
}
