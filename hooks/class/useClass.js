import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export const useAddClass = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/class/addClass`, data);
    },
    onSuccess: () => {
      toast.success("Class Scheduled Successfully");
      navigate("/class");
      queryClient.invalidateQueries({ queryKey: ["all-classes"] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.msg ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetAllClassesOfStudent = ({ currentPage }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["student-class", currentPage],
    queryFn: async () => {
      const { data } = await api.get("/class/studentClasses", {
        params: { currentPage },
      });
      return data;
    },
  });
  return { isLoading, data, error };
};

export const useStartClass = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.post(`/class/startClass/${id}`);
    },
    onSuccess: (data, id) => {
      toast.success("Class started Successfully");
      navigate(`/class/join/${id}`);
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.msg ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
