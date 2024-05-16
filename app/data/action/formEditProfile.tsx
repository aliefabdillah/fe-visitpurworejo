import { ChangePasswordSchema, EditProfilSchema } from "@/components/lib/definition";
import { authService, profileService } from "../services";
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

export async function changePasswordAction(prevState: any, formData: FormData) {
  const validatedFields = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("current_password"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("password_confirmation")
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Zod Error",
    };
  }

  if (validatedFields.data.password !== validatedFields.data.passwordConfirmation) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: {
        matchPassword: ['Password and confirm password not match!']
      },
      strapiErrors: {
        message: 'Password and confirm password not match!'
      },
      message: "Missing Fields. Failed to Login",
    };
  }

  const newPasswordData = new FormData()
  newPasswordData.append('currentPassword', validatedFields.data.currentPassword)
  newPasswordData.append('password', validatedFields.data.password)
  newPasswordData.append('passwordConfirmation', validatedFields.data.passwordConfirmation)

  const responseData = await authService.changePassword(newPasswordData)
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: 'INTERNAL ERROR',
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
      message: "Failed change password"
    };
  }

  return {
    // ...prevState,
    isLoading: false,
    isSuccess: true,
    strapiErrors: null,
    zodErrors: null,
    message: responseData.message,
  };
}
