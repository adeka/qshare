import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { searchResultsState, videoPlayerState } from "JS/atoms";
import { playlistLengthSelector } from "JS/selectors";

import firestore from "Client/firestore";

import { Layout, Input, Card } from "antd";
const { Content } = Layout;
const { Search } = Input;

import "./searchResults.scss";

const enqueueVideo = async (videoId, thumbnailUrl, title, index) => {
  await firestore
    .collection("rooms")
    .doc("wRDLEoQHH8VkmZFYBcBi")
    .collection("videos")
    .doc(videoId)
    .set({
      index,
      thumbnailUrl,
      title
    });
};

export const VideoResult = ({ videoId, thumbnailUrl, title }) => {
  const player = useRecoilValue(videoPlayerState);
  const index = useRecoilValue(playlistLengthSelector);

  return (
    <Card
      onClick={() => {
        // player.loadVideoById({ videoId });
        enqueueVideo(videoId, thumbnailUrl, title, index);
      }}
      style={{ background: `url(${thumbnailUrl}` }}
      className="videoResult"
    >
      {title
        .replace("&#39;", "'")
        .replace("&amp;", "&")
        .replace("&quot;", '"')}
    </Card>
  );
};
const SearchResults = props => {
  const results = useRecoilValue(searchResultsState);
  console.log(results);
  return (
    <div className="searchResults">
      {results.map(result => (
        <VideoResult
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
