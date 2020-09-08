import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { firestore, incrementCurrentVideoIndex } from "Client/firestore";

import {
  playlistState,
  videoPlayerState,
  roomState,
  userState,
  activeVideoState
} from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import YouTube from "react-youtube";

import { Layout, Input, Card } from "antd";
import { stringFormat, isHost } from "JS/utils";

import "Styles/playlist.scss";

const YoutubePlayer = ({ currentVideo, host }) => {
  const [videoPlayer, updateVideoPlayer] = useRecoilState(videoPlayerState);
  const room = useRecoilValue(roomState);
  const playlist = useRecoilValue(playlistState);

  return (
    <YouTube
      containerClassName="playerWrapper"
      className="player"
      opts={{
        playerVars: {
          origin: "localhost:8080",
          controls: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          rel: 0,
          fs: 0
          // https://developers.google.com/youtube/player_parameters
        }
      }}
      onReady={e => {
        updateVideoPlayer(e.target);
      }}
      onStateChange={e => {
        const videoEnded = e.data == 0;
        if (videoEnded && host) {
          incrementCurrentVideoIndex(room, playlist, currentVideo);
        }
      }}
    />
  );
};

const VideoPlayer = props => {
  const playlist = useRecoilValue(playlistState);
  const videoPlayer = useRecoilValue(videoPlayerState);
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);

  const [activeVideo, updateActiveVideo] = useRecoilState(activeVideoState);

  const currentVideo = playlist.find(
    video => video.index == room?.currentVideoIndex
  );

  useEffect(() => {
    if (
      videoPlayer &&
      currentVideo &&
      activeVideo?.videoId !== currentVideo.videoId
    ) {
      updateActiveVideo({
        videoId: currentVideo.videoId,
        index: currentVideo.index
      });
      videoPlayer.loadVideoById({
        videoId: currentVideo.videoId
        // startSeconds: 0
      });
    }
  });

  return (
    <YoutubePlayer currentVideo={currentVideo} host={isHost(user, room)} />
  );
};

export default VideoPlayer;
