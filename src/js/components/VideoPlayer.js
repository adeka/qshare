import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { firestore, getUser, tryAddUserToRoom } from "Client/firestore";

import { playlistState, videoPlayerState, roomState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import YouTube from "react-youtube";

import { Layout, Input, Card } from "antd";
import { stringFormat, isHost } from "JS/utils";

import "Styles/playlist.scss";

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

const VideoPlayer = props => {
  const [videoPlayer, updateVideoPlayer] = useRecoilState(videoPlayerState);
  const playlist = useRecoilValue(playlistState);
  const room = useRecoilValue(roomState);
  //   const currentVideo = [...playlist].reverse().pop();
  const currentVideo = playlist[room?.currentVideoIndex];

  if (videoPlayer && currentVideo) {
    videoPlayer.loadVideoById({
      videoId: currentVideo.videoId,
      startSeconds: 0
    });
  }

  return (
    <YouTube
      className="player"
      // videoId={nextVideo?.videoId}
      opts={{
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          // autoplay: 1
        }
      }}
      onReady={e => {
        updateVideoPlayer(e.target);
      }}
      onStateChange={e => {
        const videoEnded = e.data == 0;
        if (videoEnded) {
          const nextVideoIndex = room.currentVideoIndex + 1;
          firestore
            .doc(`rooms/${room.roomId}`)
            .update({ currentVideoIndex: nextVideoIndex });
        }
      }}
    />
  );
};

export default VideoPlayer;
