import { AxiosRequestConfig } from "axios";

import api from "@/api";

export const postComments = async (
  url: string,
  data: { comment: { body: string } },
  config: AxiosRequestConfig
) => {
  return await api.post(url, data, config);
};