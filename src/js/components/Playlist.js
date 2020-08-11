import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playlistState, roomState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import { firestore, incrementCurrentVideoIndex } from "Client/firestore";
import { Delete } from "Icons";
import classNames from "classnames";

import { Layout, Input, Card } from "antd";
import { stringFormat } from "JS/utils";
import "Styles/playlist.scss";

export const PlaylistResult = ({
  video,
  room,
  playlist,
  roomId,
  videoId,
  thumbnailUrl,
  title,
  index
}) => {
  const isCurrentVideo = room.currentVideoIndex == video.index;
  return (
    <Card
      onClick={() => {
        firestore.doc(`rooms/${roomId}`).update({ currentVideoIndex: index });
      }}
      style={{ background: `url(${thumbnailUrl}` }}
      className={classNames("playlistVideo", { selected: isCurrentVideo })}
    >
      {stringFormat(title)}
      <div className="index">{index}</div>
      <div
        onClick={e => {
          e.stopPropagation();

          if (isCurrentVideo) {
            incrementCurrentVideoIndex(room, playlist, video);
          }

          firestore
            .collection("rooms")
            .doc(roomId)
            .collection("videos")
            .doc(videoId)
            .delete();
        }}
      >
        {Delete}
      </div>
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
          playlist={playlist}
          room={room}
          video={result}
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
