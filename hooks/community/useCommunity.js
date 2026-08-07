import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { toast } from "react-toastify";

export const useGetAllCommunities = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      const { data } = await api.get("/community/getCommunities");
      return data;
    },
  });
  return { isLoading, error, data };
};

export const useGetSubcommunityByCommunity = ({ id }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["subCommunity", id],
    queryFn: async () => {
      const { data } = await api.get("/subCommunity/subCommunityByComm", {
        params: { id },
      });
      return data;
    },
    enabled: !!id,
  });
  return { isLoading, error, data };
};

export const useGetChatRoomsBySubCommunity = ({ id }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["chatRoom", id],
    queryFn: async () => {
      const { data } = await api.get("/chatRoom/bySubCommunity", {
        params: { subCommunityId: id },
      });
      return data;
    },
    enabled: !!id,
  });
  return { isLoading, error, data };
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (communityId) => {
      await api.post("/community/joinCommunity", { communityId });
    },
    onSuccess: () => {
      toast.success("Joined Community");
      queryClient.invalidateQueries({ queryKey: ["community"] });
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
