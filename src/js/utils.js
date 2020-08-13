export const stringFormat = str => {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
};

export const isHost = (user, room) => {
  return user && room && user.userId == room.hostUserId;
};

export const cleanString = input => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
};

export const timeConverter = timestamp => {
  const dateTime = new Date(timestamp);
  const options = { hour12: false, hour: "2-digit", minute: "2-digit" };
  return dateTime.toLocaleTimeString("en-GB", options);
};

export const isUrl = url => {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  return Boolean(url.match(regex));
};
