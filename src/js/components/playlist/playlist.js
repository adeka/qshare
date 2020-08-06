import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";

import { Layout, Input, Card } from "antd";
import { VideoResult } from "Components/searchResults/SearchResults";

import "./playlist.scss";

const Playlist = props => {
  const playlist = useRecoilValue(playlistSelector);
  return (
    <div className="playlist">
      {playlist.map(result => (
        <VideoResult
          videoId={result.videoId}
          thumbnailUrl={result.thumbnailUrl}
          title={result.title}
          key={result.videoId}
        />
      ))}
    </div>
  );
};

export default Playlist;
