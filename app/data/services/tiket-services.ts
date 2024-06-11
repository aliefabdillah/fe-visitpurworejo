import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class TiketService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  createTiket = (newTiketData: any) => {
    return this.instance
      .post(`/`, newTiketData, {
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

  getTiketByUser = () => {
    return this.instance
      .get(`/get/ticket-by-user`, {
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

  getTiketByOrderId = (orderId: string) => {
    return this.instance
      .get(`/by-order-id/${orderId}`, {
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
