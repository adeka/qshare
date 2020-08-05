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
      maxResults: 10,
      type: "video",
      key: process.env.youtube_api_key
    }
  });
};
