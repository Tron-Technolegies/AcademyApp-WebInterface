// src/utils/community.js
export const isUserInCommunity = (community, userId) => {
  if (!community?.communityMembers || !userId) return false;
  return community.communityMembers.some(
    (member) => member._id === userId || member === userId,
  );
};
