import { EntryPoint } from "./common";
import { axiosPrivate } from "../api/axios";

export function PostResetMdp(email: String) {
  return axiosPrivate.post(EntryPoint.RESET_PASSWORD_MAIL_URL, "", {
    params: {
      email: email,
    },
  });
}

export function PostNewMdp(password: String, token: String) {
  return axiosPrivate.post(EntryPoint.RESET_PASSWORD_NEW_PASSWORD, {
    token: token,
    newPassword: password,
  });
}

export function PostCheckToken(token: String) {
  return axiosPrivate.post(EntryPoint.RESET_PASSWORD_CHECK_TOKEN, "", {
    params: {
      token: token,
    },
  });
}
