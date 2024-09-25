import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
import { BASE_USER, TUser, SetState } from "../types";

interface LoginData {
  email: string;
  password: string;
}

// ------------------ LOGIN ------------------
export async function handleLogin({ email, password }: LoginData) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: import.meta.env.VITE_SERVER_URL + "/users/login",
    data: { email, password },
  };

  const getData = async () => {
    try {
      const response = await axios(config);

      // Set cookies
      const cookies = new Cookies();
      cookies.set("token", response.data.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return await getData();
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// ------------------ REGISTER ------------------
export async function handleRegister({ email, password, firstName, lastName }: RegisterData) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: import.meta.env.VITE_SERVER_URL + "/users/register",
    data: { email, password, firstName, lastName },
  };

  const getData = async () => {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return await getData();
}

// ------------------ LOGIN BY JWT ------------------
export async function handleLoginByToken() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  // Make a protected request to the server
  const config: AxiosRequestConfig = {
    method: "get",
    url: import.meta.env.VITE_SERVER_URL + "/users/loginByToken",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async () => {
    try {
      return await axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) return BASE_USER;

  const data = (await getData())?.data;
  return data;
}

// ------------------ LOGOUT ------------------
export async function handleLogout(setUser: SetState<TUser>) {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });

  setUser(BASE_USER);
}
