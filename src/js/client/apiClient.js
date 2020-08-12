import axios from "axios";
import querystring from "querystring";
import endpoints from "./endpoints";

// var playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

export const SearchRequest = query => {
  return api.get(endpoints.search, {
    params: {
      q: query,
      maxResults: 6,
      type: "video",
      key: process.env.youtube_api_key
    }
  });
};

// cors not supported on localhost
// would probably work in prod/staging
// check out this potential solution for local development using a proxy:
// https://stackoverflow.com/a/61373026
export const Unfurl = async url => {
  try {
    const data = await axios.get(url);
    console.log(data);
    // parse metadata out of the result to construct
    // an object to display an unfurl component
  } catch {
    console.log("invalid url");
  }
};
