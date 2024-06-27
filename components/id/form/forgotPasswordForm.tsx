"use client";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ZodErrors from "../response/ZodErrors";
import Link from "next/link";
import StrapiErrors from "../response/StrapiErrors";
import ModalLoading from "@/components/Loader/ModalLoading";
import { forgotPasswordFormSchema } from "@/components/lib/definition";
import { authService } from "@/app/data/services";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";


export default function ForgotPasswordForm() {
  const [responseMessage, setResponseMessage] = useState<StrapiErrorsProps>({
    name: "",
    message: "",
    status: ""
  })
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState<string[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit behavior
    setIsLoading(true)
    setValidationErrorMessage([]);
    setResponseMessage({
      name: "",
      message: "",
      status: ""
    })

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");

    const validateFields = forgotPasswordFormSchema.safeParse({
      email: email,
    });

    if (!validateFields.success) {
      const emailErrors = validateFields.error.flatten().fieldErrors.email || [];
      setIsLoading(false);
      setValidationErrorMessage(emailErrors as string[]);
      return
    }

    const response = await authService.forgotPassword(validateFields.data)
    if (response.ok) {
      setIsSuccess(true)
      setResponseMessage({
        name: "",
        message: intl ? intl.auth.forgotPassword.successMessage : "",
        status: ""
      })
    } else {
      setResponseMessage({
        name: "",
        message: intl ? intl.auth.forgotPassword.errorMessage : "",
        status: ""
      })
    }
    setIsLoading(false)
  };

  return (
    <>
      <form
        id="form-forgot-password"
        // onSubmit={() => handleSubmit()}
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 bg-white rounded-lg shadow-2xl p-8 xl:p-12"
      >
        <h2 className="text-center text-2xl font-black mb-2">
          {intl ? intl.auth.forgotPassword.title : ""}
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
          <ZodErrors error={validationErrorMessage} />
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
          {intl ? intl.auth.forgotPassword.btnText : ""}
        </button>
        <StrapiErrors error={responseMessage} classname={`${isSuccess ? "alert-info" : "alert-error" } mt-4`} />
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
      </form>
      <ModalLoadingLite isOpen={isLoading} />
    </>
  );
}
