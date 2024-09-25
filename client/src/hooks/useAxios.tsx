import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function useAxios(config: AxiosRequestConfig, dependencies: any[] = []) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(config);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, dependencies);

  return { data, isLoading, error };
}
