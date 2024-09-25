import axios, { AxiosRequestConfig } from "axios";

export default async function getAxios(config: AxiosRequestConfig) {
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    console.error(err);

    return err;
  }
}
