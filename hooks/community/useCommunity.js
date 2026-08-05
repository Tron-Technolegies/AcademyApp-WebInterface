import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";

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
  });
  return { isLoading, error, data };
};
