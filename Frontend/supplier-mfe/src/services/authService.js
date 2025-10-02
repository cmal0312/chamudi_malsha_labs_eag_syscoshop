import { apiClient } from "./apiClient";

export const getCurrentUser = async () => {
  return apiClient("/auth/me");
};
