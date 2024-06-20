"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { loginUserAction } from "@/app/data/action/auth";
import { useFormState } from "react-dom";
import ZodErrors from "../response/ZodErrors";
import StrapiErrors from "../response/StrapiErrors";
import ModalLoading from "@/components/Loader/ModalLoading";
import { useSearchParams } from "next/navigation";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import router from "next/router";

const INITIAL_STATE = {
  data: null,
}; // <---  add this

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoginState, formLoginAction] = useFormState(
    loginUserAction,
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
    if (!formLoginState.isLoading) {
      setIsLoading(false);
    }
  }, [formLoginState]);

  return (
    <>
      <form
        id="form-login"
        onSubmit={() => setIsLoading(true)}
        action={formLoginAction}
        className="w-2/3 bg-white rounded-lg shadow-2xl p-12"
      >
        <h2 className="text-center text-2xl font-black mb-2">
          {intl ? intl.auth.login.title : ""}
        </h2>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:border-orange-300"
          />
          <ZodErrors error={formLoginState?.zodErrors?.identifier} />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
            <span className="label-text-alt">
              <Link
                href={"#"}
                className="text-sm hover:underline hover:font-bold"
              >
                {intl ? intl.auth.login.forgotPassword : ""}
              </Link>
            </span>
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
          <ZodErrors error={formLoginState?.zodErrors?.password} />
        </label>
        <input
          type="text"
          id="languge"
          name="language"
          value={langQuery ? langQuery : ""}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 pr-10 focus:outline-none focus:border-orange-300"
          hidden
        />
        <button
          type="submit"
          className="w-full bg-secondary mt-2 text-white rounded-md p-2 text-sm transition ease-in-out hover:bg-orange-400 hover:font-bold"
        >
          {intl ? intl.auth.login.textButton : ""}
        </button>
        <div className="flex justify-center items-center mt-4">
          <p className="text-center text-sm text-gray-500">
            {intl ? intl.auth.login.dontHaveAccount : ""}&nbsp;
          </p>
          <Link
            href={{
              pathname: "/auth/register",
              query: { lang: langQuery },
            }}
            className="text-sm font-medium text-primary hover:underline hover:font-bold"
          >
            {intl ? intl.auth.login.registerLinkText : ""}
          </Link>
        </div>
        <div className="flex justify-center items-center mt-2">
          <Link
            href={{
              pathname: "/home",
              query: { lang: langQuery },
            }}
            className="text-sm underline font-medium text-primary hover:font-bold"
          >
            Home
          </Link>
        </div>
        <StrapiErrors error={formLoginState.strapiErrors} classname="mt-4" />
      </form>
      <ModalLoading isOpen={isLoading} />
    </>
  );
}
