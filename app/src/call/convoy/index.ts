import API from "services/api";
import { ConvoyType } from "typings";

type ConvoysRes = {
  data: ConvoyType[];
  ok: boolean;
  error?: string;
};
export type AnyRes = {
  data: ConvoyType[];
  ok: boolean;
  error?: string;
};
type ConvoyRes = {
  data: ConvoyType;
  ok: boolean;
  error?: string;
};

export const getConvoy = async (id: string | undefined) => {
  if (!id) return;
  const response = await API.get({
    path: `/event/${id}`,
  });

  return response as ConvoyRes;
};

export const getConvoys = async () => {
  const response = await API.get({
    path: `/event`,
  });

  return response as ConvoysRes;
};

export const deleteConvoy = async (id: string | undefined) => {
  if (!id) return null;
  const response = await API.delete({ path: `/event/${id}` });

  return response;
};
