"use client";
import React, { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { userService } from "@/app/data/services";
import { User } from "@/components/types/user";
import { StrapiErrorsProps } from "@/components/types/strapiErrors";
import Image from "next/image";
import { useFormState } from "react-dom";
import { editProfilAction } from "@/app/data/action/formEditProfile";
import StrapiErrors from "../response/StrapiErrors";
import ZodErrors from "../response/ZodErrors";
import ModalLoadingLite from "@/components/Loader/ModalLoadingLite";
import SuccessModal from "../response/SuccessModal";
import Cookies from "js-cookie";
import { Locale, getDictionary } from "@/components/dictionaries/dictionaries";
import { useSearchParams } from "next/navigation";
interface FormProfileState {
  id: number;
  username?: string;
  email?: string;
  hometown?: string;
  fullname?: string;
  phone?: string;
  img_profile?: {
    url: string;
    name: string;
  };
}

const INITIAL_STATE = {
  data: null,
};

export default function EditProfilForm() {
  const [singleImage, setSingleImage] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [formEditState, formEditAction] = useFormState(
    editProfilAction,
    INITIAL_STATE
  );
  const [strapiError, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });
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

  const [formProfileState, setFormProfileState] = useState<FormProfileState>({
    id: userData?.id || 0,
    username: userData?.username || "",
    fullname: userData?.fullname || "",
    email: userData?.email || "",
    hometown: userData?.hometown || "",
    phone: userData?.phone || "",
    img_profile: {
      url: userData?.img_profile?.url || "",
      name: userData?.img_profile?.name || "",
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormProfileState({
        id: userData.id || 0,
        username: userData.username || "",
        fullname: userData.fullname || "",
        email: userData.email || "",
        hometown: userData.hometown || "",
        phone: userData.phone || "",
        img_profile: {
          url: userData.img_profile?.url || "",
          name: userData.img_profile?.name || "",
        },
      });
    }

    if (!formEditState.isLoading) {
      setIsLoading(false);
    }
    if (formEditState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [formEditState, userData]);

  const loadData = async () => {
    const response = await userService.getMe();

    if (response.error) {
      setError({
        message: response.error.message,
        name: response.error.name,
        status: response.error.status,
      });
    } else {
      const userResult: any = response;
      const formattedUserData: User = {
        id: userResult?.id,
        username: userResult?.username,
        email: userResult?.email,
        fullname: userResult?.fullname,
        hometown: userResult?.hometown,
        phone: userResult?.phone,
        img_profile: {
          url: userResult?.img_profile?.url,
          name: userResult?.img_profile?.name,
        },
      };
      setUserData(formattedUserData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSingleImage(Array.from(e.target.files));
    }
  };

  return (
    <>
      <SuccessModal message="Berhasil edit profil" />
      <form className="px-12" id="form-edit-profil" action={formEditAction}>
        <input
          type="text"
          placeholder="Type here"
          name="id"
          className="input input-bordered w-full"
          value={formProfileState.id}
          hidden
          readOnly
        />
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 my-3">
          {formProfileState.img_profile?.url && singleImage.length === 0 ? (
            <div className="w-56 h-56 sm:w-24 sm:h-24 md:w-32 md:h-28 rounded-full mr-2 border-4 border-gray-300">
              <Image
                width={1200}
                height={1200}
                alt="img_profile"
                src={formProfileState.img_profile.url}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : singleImage.length > 0 ? (
            <div className="w-54 h-54 sm:w-24 sm:h-24 md:w-32 md:h-28 rounded-full mr-2 border-4 border-gray-300">
              <Image
                width={1200}
                height={1200}
                alt="img_profile"
                src={URL.createObjectURL(singleImage[0])}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <AccountCircleIcon sx={{ fontSize: 125 }} />
          )}
          {/* <div className="w-28 rounded-full mr-2">
          </div> */}
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.avatarLabelTop : ""}
            </p>
            <input
              type="file"
              name="img_profile"
              accept="image/png, image/jpeg"
              className="file-input file-input-bordered w-full"
              onChange={handleSingleFileSelected}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.avatarLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.img_profile} />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.nameLabelTop : ""}
            </p>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              className="input input-bordered w-full"
              value={formProfileState.fullname}
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.nameLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.name} />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.usernameLabelTop : ""}
            </p>
            <input
              type="text"
              placeholder="John123"
              name="username"
              className="input input-bordered w-full"
              value={formProfileState.username}
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.usernameLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.username} />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.emailLabelTop : ""}
            </p>
            <input
              type="text"
              placeholder="John@example.com"
              name="email"
              className="input input-bordered w-full"
              value={formProfileState.email}
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.emailLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.email} />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.phoneLabelTop : ""}
            </p>
            <input
              type="text"
              placeholder="+628123456789"
              name="phone"
              className="input input-bordered w-full"
              value={formProfileState.phone}
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.phoneLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.phone} />
              </span>
            </div>
          </label>
        </div>
        <div className="flex flex-row items-start gap-4 my-6">
          <label className="form-control w-full">
            <p className="font-bold text-xl mb-2">
              {intl ? intl.profile.editProfile.regionLabelTop : ""}
            </p>
            <input
              type="text"
              placeholder="Jakarta"
              name="hometown"
              className="input input-bordered w-full"
              value={formProfileState.hometown}
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text">
                {intl ? intl.profile.editProfile.regionLabelBot : ""}
              </span>
              <span className="label-text-alt">
                <ZodErrors error={formEditState?.zodErrors?.hometown} />
              </span>
            </div>
          </label>
        </div>
        <StrapiErrors error={formEditState.strapiErrors} classname="mb-4" />
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
            {intl ? intl.profile.editProfile.saveButtonText : ""}
          </button>
        </div>
      </form>
      <ModalLoadingLite isOpen={isLoading} />
    </>
  );
}
