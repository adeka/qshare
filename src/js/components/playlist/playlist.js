import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";

import { Layout, Input, Card } from "antd";
import { VideoResult } from "Components/searchResults/SearchResults";
import { stringFormat } from "JS/utils";
import "./playlist.scss";

export const PlaylistResult = ({ roomId, videoId, thumbnailUrl, title }) => {
  return (
    <Card
      onClick={() => {
        // player.loadVideoById({ videoId });
      }}
      style={{ background: `url(${thumbnailUrl}` }}
      className="videoResult"
    >
      {stringFormat(title)}
    </Card>
  );
};

const Playlist = props => {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="playlist">
      {playlist.map(result => (
        <PlaylistResult
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
