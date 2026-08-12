import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

export const useGetAllInstructorClasses = ({ currentPage, search }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["all-classes", currentPage, search],
    queryFn: async () => {
      const { data } = await api.get("/class/getClassByInstructor", {
        params: { currentPage, search },
      });
      return data;
    },
  });
  return { isLoading, data, error };
};

export const useGetCoursesByInstructor = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get("/instructor/getCoursesByInstructor");
      return data;
    },
  });
  return { isLoading, data, error };
};
