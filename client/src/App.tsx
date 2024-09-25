import { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import useLoginByToken from "./hooks/useLoginByToken";
import { router } from "./router";
import { BASE_USER, SetState, TUser } from "./types";

interface Store {
  user: TUser;
  setUser: SetState<TUser>;
}

export const Store = createContext({} as Store);

function App() {
  const [user, setUser] = useState<TUser>(BASE_USER);

  const store = { user, setUser };

  useLoginByToken(setUser);

  return (
    <Store.Provider value={store}>
      <Navbar />
      <RouterProvider router={router} />
    </Store.Provider>
  );
}

export default App;
