import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

export const useGetEnrolledCourse = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["enrolledCourse"],
    queryFn: async () => {
      const { data } = await api.get("/course/getEnrolledCourse");
      return data;
    },
  });
  return { isLoading, data, error };
};
