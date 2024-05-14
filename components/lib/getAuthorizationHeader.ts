import Cookies from "js-cookie"

export function getAuthorizationHeader() {
  const userToken = Cookies.get('token')
  if (userToken) {
    return {
      Authorization: `Bearer ${userToken}`,
    };
  }
}