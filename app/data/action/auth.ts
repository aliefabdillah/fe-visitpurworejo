"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/components/lib/definition";
import { authService } from "../services";
import { encryptUserId } from "@/components/lib/crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24, // 1 day
  path: "/",
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
};

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    identifier: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Login",
    };
  }

  const responseData = await authService.login(validatedFields.data);
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: null,
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
      message: "Failed to Login.",
    };
  }

  const language = formData.get('language')?.toString();
  const encryptedId = encryptUserId(responseData.user.id);
  if (!responseData.user.isAdmin) {
    cookies().set("id", String(responseData.user.id), config);
    cookies().set("lang", language ? language : "id", config);
  
    cookies().set("token", responseData.jwt, config);
    cookies().set("confirmed", responseData.user.confirmed, config);
    cookies().set("blocked", responseData.user.blocked, config);
    cookies().set("isAdmin", responseData.user.isAdmin, config);
    cookies().set("isActive", responseData.user.isActive, config);
    const sessionData = {
      username: responseData.user.username,
      img_profile: responseData.user.img_profile,
      point: responseData.user.point
    }
    cookies().set("session", JSON.stringify(sessionData), config)
    redirect('/profil');
  } else {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: {
        message: "Wrong Credentials. Try Again",
      },
      zodErrors: null,
      message: "Failed to Login.",
    };
  }
}

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confrimPassword"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Login",
    };
  }

  if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: {
        matchPassword: ['Password and confirm password not match!']
      },
      strapiErrors: null,
      message: "Missing Fields. Failed to Login",
    };
  }

  const formattedData = {
    username: validatedFields.data.username,
    email: validatedFields.data.email,
    password: validatedFields.data.password
  }

  const responseData = await authService.register(formattedData)
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: null,
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
      message: "Failed to edit Artikel",
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

export async function logoutAction() {
  cookies().set("id", "", { ...config, maxAge: 0 });
  cookies().set("token", "", { ...config, maxAge: 0 });
  cookies().set("lang", "",  {...config, maxAge: 0});
  cookies().set("confirmed", "", { ...config, maxAge: 0 });
  cookies().set("blocked", "", { ...config, maxAge: 0 });
  cookies().set("isAdmin", "", { ...config, maxAge: 0 });
  cookies().set("isActive", "", { ...config, maxAge: 0 });
  cookies().set("session", "", { ...config, maxAge: 0 })

  redirect("/home");
}