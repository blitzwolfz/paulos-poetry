import axios, { AxiosRequestConfig } from "axios";

export default async function getData(config: AxiosRequestConfig) {
  const { data } = await axios(config);

  return data;
}
