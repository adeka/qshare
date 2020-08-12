export const stringFormat = str => {
  return str
    .replace("&#39;", "'")
    .replace("&amp;", "&")
    .replace("&quot;", '"');
};

export const isHost = (user, room) => {
  return user && room && user.userId == room.hostUserId;
};
