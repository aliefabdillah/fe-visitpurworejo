"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { registerUserAction } from "@/app/data/action/auth";
import { useFormState } from "react-dom";
import ZodErrors from "../response/ZodErrors";
import StrapiErrors from "../response/StrapiErrors";
import ModalLoading from "@/components/Loader/ModalLoading";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";

const INITIAL_STATE = {
  data: null,
}; // <---  add this

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formRegisterState, formRegisterAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang");
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

  const togglePasswordVisibility = (type: string) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  useEffect(() => {
    if (!formRegisterState.isLoading) {
      setIsLoading(false);
    }
  }, [formRegisterState]);

  return (
    <>
      {formRegisterState.isSuccess ? (
        <div className="modal-box w-fit flex flex-col items-center gap-3 p-8 xl:p-12">
          <svg
            className="h-36 w-36 fill-primary dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill=""
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
            />
          </svg>
          <div className="text-center">
            <p className="font-normal text-lg">
            {intl ? intl.auth.register.alert.text : ""}&nbsp;
              <Link
                href={{
                  pathname: "/auth/login",
                  query: { lang: langQuery },
                }}
                className="underline font-medium"
              >
                {intl ? intl.auth.register.alert.linkText : ""}
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <form
          action={formRegisterAction}
          onSubmit={() => setIsLoading(true)}
          className="w-full md:w-2/3 bg-white rounded-lg shadow-2xl p-8 xl:p-12"
        >
          <h2 className="text-center text-2xl font-black mb-2">
            {intl ? intl.auth.register.title : ""}
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="JohnDoe"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-orange-300"
            />
            <ZodErrors error={formRegisterState?.zodErrors?.username} />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-orange-300"
            />
            <ZodErrors error={formRegisterState?.zodErrors?.email} />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="tes123"
                className="w-full border border-gray-300 rounded-md p-2 mb-4 pr-10 focus:outline-none focus:border-orange-300"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-0 flex items-center px-3 mb-4 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <ZodErrors error={formRegisterState?.zodErrors?.password} />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                {intl ? intl.auth.register.confirmPassword : ""}
              </span>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confrimPassword"
                placeholder="tes123"
                className="w-full border border-gray-300 rounded-md p-2 mb-4 pr-10 focus:outline-none focus:border-orange-300"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute inset-y-0 right-0 flex items-center px-3 mb-4 text-gray-500 "
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <ZodErrors error={formRegisterState?.zodErrors?.confirmPassword} />
            <ZodErrors error={formRegisterState?.zodErrors?.matchPassword} />
          </label>

          <button
            type="submit"
            className="w-full bg-secondary text-white rounded-md p-2 mt-4 text-sm transition ease-in-out hover:bg-orange-400 hover:font-bold"
          >
            {intl ? intl.auth.register.textButton : ""}
          </button>
          <div className="flex justify-center items-center mt-4">
            <p className="text-center text-sm text-gray-500">
              {intl ? intl.auth.register.dontHaveAccount : ""}&nbsp;
            </p>
            <Link
              href={{
                pathname: "/auth/login",
                query: { lang: langQuery },
              }}
              className="text-sm font-medium text-primary hover:underline hover:font-bold"
            >
              {intl ? intl.auth.register.loginLinkText : ""}
            </Link>
          </div>
          <StrapiErrors
            error={formRegisterState.strapiErrors}
            classname={`mt-4 ${
              formRegisterState.isSuccess ? "alert-success" : "alert-error"
            }`}
          />
        </form>
      )}
      <ModalLoading isOpen={isLoading} />
    </>
  );
}
