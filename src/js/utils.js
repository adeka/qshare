export const stringFormat = str => {
  return str
    .replace("&#39;", "'")
    .replace("&amp;", "&")
    .replace("&quot;", '"');
};
