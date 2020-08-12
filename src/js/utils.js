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
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
};

export const timeConverter = UNIX_timestamp => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  // const time =
  //   date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  const time = hour + ":" + min;
  return time;
};

export const isUrl = url => {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  return Boolean(url.match(regex));
};
