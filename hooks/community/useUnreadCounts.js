import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";

export const useUnreadCounts = ({ userId, chatRoomIds }) => {
  const queryClient = useQueryClient();
  const key = ["unreadCounts", userId, chatRoomIds.join(",")];
  const { isLoading, data } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get("/chatRoom/unreadCounts", {
        params: { userId, chatRoomIds: chatRoomIds.join(",") },
      });
      return data;
    },
    enabled: !!userId && !!chatRoomIds?.length,
  });

  const bumpUnread = (chatRoomId) => {
    queryClient.setQueryData(key, (prev) => ({
      ...prev,
      [chatRoomId]: (prev?.[chatRoomId] || 0) + 1,
    }));
  };

  const clearUnread = (chatRoomId) => {
    queryClient.setQueryData(key, (prev) => ({
      ...prev,
      [chatRoomId]: 0,
    }));
  };

  return {
    unreadCounts: data || {},
    isLoading,
    bumpUnread,
    clearUnread,
    queryKey: key,
  };
};
