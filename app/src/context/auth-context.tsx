import React, { useEffect } from "react";
import API from "services/api";

type User = {
  ok: boolean;
  user?: {
    email: string;
    name: string;
    _id: string;
  };
};

export type SignupType = {
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
  signup: (user: SignupType, callback: Function) => void;
  logout: (callback: VoidFunction) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  const getUserByToken = () =>
    API.get({
      path: "/user/signin-token",
    });

  useEffect(() => {
    if (!user) {
      getUserByToken().then((d) => setUser(d));
    }
  }, [user]);

  let signup = async (form: SignupType, callback: Function) => {
    const response = await API.post({
      path: "/user/signup",
      body: { ...form },
    });
    setUser(response);
    callback(response);
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

  let value = { user, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
