import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../src/UserContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/auth/login", data);
    },
    onSuccess: () => {
      toast.success("Successfully Logged In");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.msg ||
          "something went wrong. please try again",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetUserInfo = () => {
  const { setUser } = useContext(UserContext);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await api.get(`/user/userInfo`);
      setUser(data.user);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Successfully Logged In");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.msg ||
          "something went wrong. please try again",
      );
    },
  });
  return { isPending, mutateAsync };
};
