import API from "services/api";

export const signin = async (email: string | undefined, password:string | undefined ) => {
  if (!email || !password) return;
  const body = { email, password };
  const response = await API.post({
    path: `user/signin`,
    body 
  });

  return response;
};

export type SignupBody = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    phone?: string;
}
export const signup = async (body: SignupBody) => {
  if (!body) return;
  const response = await API.post({
    path: `user/signup`,
    body 
  });

  return response;
};
