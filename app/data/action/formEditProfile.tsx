import { EditProfilSchema } from "@/components/lib/definition";
import { profileService } from "../services";
import Cookies from "js-cookie";

const config = {
  maxAge: 60 * 60 * 24, // 1 day
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
};

export async function editProfilAction(prevState: any, formData: FormData) {
  const imgProfileFile = formData.get("img_profile");
  const fullName = formData.get("fullname");
  const hometown = formData.get("hometown");
  const phone = formData.get("phone");

  const fields = [imgProfileFile, fullName, hometown, phone];
  const allFieldsExist = fields.every(
    (field) => field && (field instanceof File ? field.size > 0 : field)
  );
  const someFieldsExist = fields.some(
    (field) => field && (field instanceof File ? field.size > 0 : field)
  );
  const noFieldsExist = fields.every(
    (field) => !field || (field instanceof File && field.size === 0)
  );

  var validatedFields;
  if (noFieldsExist) {
    validatedFields = EditProfilSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
    });
  } else if (someFieldsExist) {
    validatedFields = EditProfilSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      img_profile:
        imgProfileFile instanceof File && imgProfileFile.size > 0
          ? imgProfileFile
          : undefined,
      fullname: fullName || undefined,
      hometown: hometown || undefined,
      phone: phone || undefined,
    });
  } else if (allFieldsExist) {
    validatedFields = EditProfilSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      img_profile: imgProfileFile,
      fullname: fullName,
      hometown: hometown,
      phone: phone,
    });
  }

  if (!validatedFields?.success) {
    // Handle validation error
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields?.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Edit",
    };
  }

  const formattedProfileData = {
    username: validatedFields.data.username,
    email: validatedFields.data.email,
    fullname: validatedFields.data?.fullname,
    hometown: validatedFields.data?.hometown,
    phone: validatedFields.data?.phone
  }

  const newProfileData = new FormData()
  newProfileData.append('data', JSON.stringify(formattedProfileData))
  newProfileData.append('files.img_profile', validatedFields.data?.img_profile)

  const editedUserlId = formData.get("id")?.toString();
  const responseData = await profileService.editProfile(newProfileData, editedUserlId ? editedUserlId : "")
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: 'Edit Profile Failed',
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to edit profile",
    };
  }

  console.log(responseData.data)
  const sessionDataNew = {
    username: responseData.data.username,
    img_profile: responseData.data.img_profile,
    point: responseData.data.point
  }
  Cookies.set("session", JSON.stringify(sessionDataNew));

  return {
    // ...prevState,
    data: sessionDataNew,
    isLoading: false,
    isSuccess: true,
    strapiErrors: null,
    zodErrors: null,
    message: responseData.message,
  };
}
