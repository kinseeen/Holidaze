import { useGet } from "./ApiCalls";

export const useProfileVenues = (name) => {
  return useGet(`/holidaze/profiles/${name}/venues`);
};