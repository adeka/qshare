export const stringFormat = str => {
  return str
    .replace("&#39;", "'")
    .replace("&amp;", "&")
    .replace("&quot;", '"');
};

export const isHost = (user, room) => {
  return user && room && user.userId == room.hostUserId;
};

export const cleanString = input => {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
};
