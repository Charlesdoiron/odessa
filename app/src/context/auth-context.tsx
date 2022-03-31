import React, { useEffect } from "react";
import API from "services/api";

interface AuthContextType {
  user: Record<string, any>;
  login: (user: Record<string, any>, callback: VoidFunction) => void;
  signin: (user: Record<string, any>, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  const getUserByToken = async () => {
    const user = await API.get({
      path: "/user/signin-token",
    });
    return user;
  };

  useEffect(() => {
    getUserByToken().then((d) => console.log(d));
  });

  let signin = async (form: Record<string, any>, callback: VoidFunction) => {
    const response = await API.post({
      path: "/user/signin",
      body: { ...form },
    });
    setUser(response);
    callback();
  };

  let login = async (form: Record<string, any>, callback: VoidFunction) => {
    const response = await API.post({
      path: "/user/login",
      body: { ...form },
    });
    setUser(response);
    callback();
  };

  let logout = async (callback: VoidFunction) => {
    await API.post({
      path: "/user/logout",
    });
    setUser(null);
    callback();
  };

  let value = { user, login, signin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
