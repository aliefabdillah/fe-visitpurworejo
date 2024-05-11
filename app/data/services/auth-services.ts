import axios, { AxiosInstance } from "axios";

interface LoginUserProps {
  identifier: string;
  password: string;
}

interface RegisterUserProps {
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  login = (userData: LoginUserProps) => {
    return this.instance
      .post("/local", userData)
      .then((res) => {
        return res.data
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse
      })
  };

  register = (userData: RegisterUserProps) => {
    return this.instance
      .post("/local/register", userData)
      .then((res) => {
        return res.data
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse
      })
  }
}
