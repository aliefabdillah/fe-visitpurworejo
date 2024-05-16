import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";
import { headers } from "next/headers";

export class ProfileService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  editProfile = (newProfile: any, id: string) => {
    return this.instance
      .put(`/edit-profile/${id}`, newProfile, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };
}
