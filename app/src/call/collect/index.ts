import API from "services/api";

export const getCollects = async (id: string | undefined) => {
  if (!id) return;
  const response = await API.get({
    path: `/collect/${id}`,
  });

  return response;
};
