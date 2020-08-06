import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { searchResultsState, videoPlayerState } from "JS/atoms";

import { Layout, Input, Card } from "antd";
import { VideoResult } from "Components/searchResults/SearchResults";

import "./playlist.scss";

const Playlist = props => {
  const results = [];
  return (
    <div className="playlist">
      {results.map(result => (
        <VideoResult result={result} key={result.id.videoId} />
      ))}
    </div>
  );
};

export default Playlist;
