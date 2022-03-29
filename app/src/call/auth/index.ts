import API from "services/api";

export const signin = async (email: string | undefined, password:string | undefined ) => {
  if (!email || !password) return;
  const response = await API.get({
    path: `/signin`,
    
  });

  return response;
};
