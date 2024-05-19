import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class LaporanUlasanService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  reportUlasan = (reportData: any) => {
    return this.instance
    .post(`/`, reportData, {
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
