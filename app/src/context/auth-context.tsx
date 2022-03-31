import React, { useEffect } from "react";
import API from "services/api";

type User = {
  email: string;
  name: string;
  _id: string;
};

export type SigninType = {
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  name: string;
};

export type LoginType = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User;
  login: (user: LoginType, callback: VoidFunction) => void;
  signin: (user: SigninType, callback: VoidFunction) => void;
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
    if (!user) {
      getUserByToken().then((d) => console.log(d));
    }
  }, [user]);

  let signin = async (form: SigninType, callback: VoidFunction) => {
    const response = await API.post({
      path: "/user/signin",
      body: { ...form },
    });
    setUser(response);
    callback();
  };

  let login = async (form: LoginType, callback: VoidFunction) => {
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
