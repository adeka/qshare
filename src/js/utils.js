export const stringFormat = str => {
  return str
    .replace("&#39;", "'")
    .replace("&amp;", "&")
    .replace("&quot;", '"');
};

export const isHost = (user, room) => {
  return user.userId == room.hostUserId;
};
