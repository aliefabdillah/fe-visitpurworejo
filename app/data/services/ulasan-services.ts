import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class UlasanService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getUlasanByJenis = (jenis: string) => {
    return this.instance
      .get(`/get/review-wisata?jenis_wisata=${jenis}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };

  getUlasanAccount = () => {
    return this.instance
    .get(`/profile/ulasan-account`, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response.data;
      return errorResponse;
    });
  }
}
