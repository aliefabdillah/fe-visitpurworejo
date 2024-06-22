"use client";
import { authService } from "@/app/data/services";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import {
  forgotPasswordFormSchema,
  resetPasswordFormSchema,
} from "@/components/lib/definition";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ZodErrors from "../response/ZodErrors";
import StrapiErrors from "../response/StrapiErrors";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";

export default function ResetPasswordForm() {
  const [responseMessage, setResponseMessage] = useState<StrapiErrorsProps>({
    name: "",
    message: "",
    status: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<
    string[]
  >([]);
  const [
    confirmPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
  ] = useState<string[]>([]);
  const [matchPasswordValidationMessage, setMatchPasswordValidationMessage] =
    useState<string[]>([]);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("id");
  // const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit behavior
    setIsLoading(true);
    setPasswordValidationMessage([]);
    setConfirmPasswordValidationMessage([]);
    setMatchPasswordValidationMessage([]);
    setResponseMessage({
      message: "",
      status: "",
      name: "",
    });

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const code = searchParams.get("code");

    const validateFields = resetPasswordFormSchema.safeParse({
      code: code,
      password: password,
      passwordConfirmation: confirmPassword,
    });

    if (!validateFields.success) {
      const passwordErrors =
        validateFields.error.flatten().fieldErrors.password || [];
      const confirmPasswordErrors =
        validateFields.error.flatten().fieldErrors.passwordConfirmation || [];
      const codeErrors = validateFields.error.flatten().fieldErrors.code || "";
      setResponseMessage({
        message: codeErrors[0],
        status: "",
        name: "",
      });
      setPasswordValidationMessage(passwordErrors as string[]);
      setConfirmPasswordValidationMessage(confirmPasswordErrors as string[]);
      setIsLoading(false);
      return;
    }

    if (
      validateFields.data.password !== validateFields.data.passwordConfirmation
    ) {
      const matchPasswordErrors = ["Password and confirm password not match!"];
      setMatchPasswordValidationMessage(matchPasswordErrors as string[]);
      setIsLoading(false);
      return;
    }

    const response = await authService.resetPassword(validateFields.data);
    if (response.jwt) {
      setIsSuccess(true);
    } else {
      setResponseMessage({
        name: "",
        message: intl ? intl.auth.resetPassword.errorMessage : "",
        status: "",
      });
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = (type: string) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="modal-box w-fit flex flex-col items-center gap-3 p-12">
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
              {intl ? intl.auth.resetPassword.successMessage : ""}&nbsp;
              <Link
                href={{
                  pathname: "/auth/login",
                  query: { lang: query },
                }}
                className="underline font-medium"
              >
                <br/>{intl ? intl.auth.register.alert.linkText : ""}
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <form
          id="form-forgot-password"
          // onSubmit={() => handleSubmit()}
          onSubmit={handleSubmit}
          className="w-2/3 bg-white rounded-lg shadow-2xl p-12"
        >
          <h2 className="text-center text-2xl font-black mb-2">
            {intl ? intl.auth.resetPassword.title : ""}
          </h2>

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
            <ZodErrors error={passwordValidationMessage} />
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
                name="confirmPassword"
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
            <ZodErrors error={confirmPasswordValidationMessage} />
            <ZodErrors error={matchPasswordValidationMessage} />
          </label>

          <button
            type="submit"
            className="w-full bg-secondary mt-2 text-white rounded-md p-2 text-sm transition ease-in-out hover:bg-orange-400 hover:font-bold"
          >
            {intl ? intl.auth.resetPassword.btnText : ""}
          </button>
          <StrapiErrors
            error={responseMessage}
            classname={`${isSuccess ? "alert-info" : "alert-error"} mt-4`}
          />
          <div className="flex justify-center items-center mt-4">
            <span className="text-sm font-medium">
              {intl ? intl.auth.resetPassword.langText : ""}&nbsp;
            </span>
            <a
              onClick={() => {}}
              className="text-sm underline font-medium text-primary hover:font-bold hover:cursor-pointer"
            >
              EN
            </a>
          </div>
        </form>
      )}
      <ModalLoadingLite isOpen={isLoading} />
    </>
  );
}
