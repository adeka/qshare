import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { searchResultsState, videoPlayerState, playlistState } from "JS/atoms";

import { firestore } from "Client/firestore";

import { Layout, Input, Card } from "antd";
const { Content } = Layout;
const { Search } = Input;
import { SearchRequest } from "Client/apiClient";
import { stringFormat } from "JS/utils";

import "Styles/searchResults.scss";

const enqueueVideo = async (roomId, videoId, thumbnailUrl, title, index) => {
  await firestore
    .collection("rooms")
    .doc(roomId)
    .collection("videos")
    .doc(videoId)
    .set({
      index,
      thumbnailUrl,
      title
    });
};

export const VideoResult = ({ roomId, videoId, thumbnailUrl, title }) => {
  const playlist = useRecoilValue(playlistState);
  const index = playlist.length > 0 ? [...playlist].pop().index + 1 : 0;
  return (
    <Card
      onClick={() => {
        enqueueVideo(roomId, videoId, thumbnailUrl, title, index);
      }}
      style={{ background: `url(${thumbnailUrl}` }}
      className="videoResult"
    >
      {stringFormat(title)}
    </Card>
  );
};

const SearchResults = ({ roomId }) => {
  const [searchResults, updateSearchResults] = useRecoilState(
    searchResultsState
  );

  const results = useRecoilValue(searchResultsState);

  const search = async query => {
    try {
      const { data } = await SearchRequest(query);
      updateSearchResults(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="searchResults">
      <Search
        placeholder="Search Videos..."
        onSearch={value => search(value)}
      />

      {results.map(result => (
        <VideoResult
          roomId={roomId}
          videoId={result.id.videoId}
          thumbnailUrl={result.snippet.thumbnails.medium.url}
          title={result.snippet.title}
          key={result.id.videoId}
        />
      ))}
    </div>
  );
};

export default SearchResults;
