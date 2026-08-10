import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

export const useGetEnrolled = ({ currentPage, search }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["enrolled", currentPage, search],
    queryFn: async () => {
      const { data } = await api.get("/instructor/getAllEnrolled", {
        params: { currentPage, search },
      });
      return data;
    },
  });
  return { isLoading, data, error };
};
