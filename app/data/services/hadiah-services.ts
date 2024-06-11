import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class HadiahService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getHadiah = () => {
    return this.instance
      .get(`?populate[0]=image`, {
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
  };

  redeemPoint = (hadiahId: number) => {
    return this.instance
    .get(`/redeem-point/${hadiahId}`, {headers: getAuthorizationHeader()})
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
