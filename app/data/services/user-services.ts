import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class UserService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getMe = () => {
    return this.instance
    .get(`/me?populate[role]=true&populate[img_profile]=true&populate[ulasan_id]=post_wisata_id`, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }
}