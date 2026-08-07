import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useCallback } from "react";

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

  const bumpUnread = useCallback(
    (chatRoomId) => {
      queryClient.setQueryData(key, (prev) => ({
        ...prev,
        [chatRoomId]: (prev?.[chatRoomId] || 0) + 1,
      }));
    },
    [queryClient, userId, chatRoomIds.join(",")],
  );

  const clearUnread = useCallback(
    (chatRoomId) => {
      queryClient.setQueryData(key, (prev) => ({
        ...prev,
        [chatRoomId]: 0,
      }));
    },
    [queryClient, userId, chatRoomIds.join(",")],
  );

  return {
    unreadCounts: data || {},
    isLoading,
    bumpUnread,
    clearUnread,
    queryKey: key,
  };
};
