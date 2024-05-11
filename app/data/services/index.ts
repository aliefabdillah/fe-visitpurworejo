import { BASE_URL } from "@/app/constants";
import { AuthService } from "./auth-services";

export const authService = new AuthService(`${BASE_URL}/auth`);