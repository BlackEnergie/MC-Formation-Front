import { AxiosInstance } from "axios";
import { EntryPoint, headersTemplate } from "./common";

export function PostMailSingUp(axios: AxiosInstance ,email: String, role: String) {
  return axios.post(EntryPoint.MAIL_URL, JSON.stringify({ email, role }), {
    headers: headersTemplate
  });
}