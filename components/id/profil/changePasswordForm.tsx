"use client";
import { changePasswordAction } from "@/app/data/action/formEditProfile";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SuccessModal from "../response/SuccessModal";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import StrapiErrors from "../response/StrapiErrors";
import ZodErrors from "../response/ZodErrors";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";

const INITIAL_STATE = {
  data: null,
};

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formChangePasswordState, formChangePasswordAction] = useFormState(
    changePasswordAction,
    INITIAL_STATE
  );

  const togglePasswordVisibility = (type: string) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    } else if (type === "currentPassword") {
      setShowCurrentPassword(!showCurrentPassword);
    }
  };

  const searchParams = useSearchParams();
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

  useEffect(() => {
    if (!formChangePasswordState.isLoading) {
      setIsLoading(false);
    }
    if (formChangePasswordState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [formChangePasswordState]);

  return (
    <>
      <SuccessModal
        message={intl ? intl.profile.changePassword.successModalText : ""}
      />
      <ModalLoadingLite isOpen={isLoading} />
      <form
        className="px-12"
        id="form-change-pasword"
        action={formChangePasswordAction}
      >
        <div className="flex flex-row items-start gap-4 my-2">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.changePassword.oldLabelTop : ""}
            </p>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Type here"
                name="current_password"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showCurrentPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.changePassword.oldLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors
                  error={formChangePasswordState?.zodErrors?.currentPassword}
                />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.changePassword.newLabelTop : ""}
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type here"
                name="password"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.changePassword.newLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors
                  error={formChangePasswordState?.zodErrors?.password}
                />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full ">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.changePassword.confirmLabelTop : ""}
            </p>
            <div className="relative">
              <input
                type={showConfirmPassword ? "tex" : "password"}
                placeholder="Type here"
                name="password_confirmation"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.changePassword.confirmLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors
                  error={
                    formChangePasswordState?.zodErrors?.passwordConfirmation
                  }
                />
              </span>
            </div>
          </label>
        </div>
        <StrapiErrors
          error={formChangePasswordState.strapiErrors}
          classname="mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={() => setIsLoading(true)}
            type="submit"
            className="
                btn
                rounded-lg 
                bg-gradient-to-l from-accent from-10% to-secondary to-90%
                hover:from-yellow-500 hover:to-orange-500
                focus:outline-none
                text-white font-bold text-xs lg:text-md xl:text-xl"
          >
            {intl ? intl.profile.changePassword.changeButtonText : ""}
          </button>
        </div>
      </form>
    </>
  );
}
