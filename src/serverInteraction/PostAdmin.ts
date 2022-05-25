import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";

export function PostMailSingUp(axios: AxiosInstance ,email: String, role: String) {
  return axios.post(EntryPoint.INVITE_MAIL_URL, JSON.stringify({ email, role }), {
    headers: headersTemplate
  });
}

export function PostModificationActif(axios: AxiosInstance, id: number) {
  return axios.post(EntryPoint.MODIFICATION_ACTIF + id, {}, {
    headers: headersTemplate
  });
}