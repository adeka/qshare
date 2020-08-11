import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playlistState, roomState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import { firestore } from "Client/firestore";

import { Layout, Input, Card } from "antd";
import { stringFormat } from "JS/utils";
import "Styles/playlist.scss";

export const PlaylistResult = ({
  roomId,
  videoId,
  thumbnailUrl,
  title,
  index
}) => {
  return (
    <Card
      onClick={() => {
        firestore.doc(`rooms/${roomId}`).update({ currentVideoIndex: index });
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
  const room = useRecoilValue(roomState);
  return (
    <div className="playlist">
      {playlist.map(result => (
        <PlaylistResult
          index={result.index}
          roomId={room.roomId}
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
