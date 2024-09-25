import { useEffect } from "react";
import { TUser, SetState } from "../types";
import { handleLoginByToken, handleLogout } from "../util/handleLogin";

export default function useLoginByToken(setUser: SetState<TUser>) {
  useEffect(() => {
    const get = async () => {
      const response = await handleLoginByToken();

      if (response) setUser(response);
      else handleLogout(setUser);
    };
    get();
  }, []);
}
