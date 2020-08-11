import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { playlistState, videoPlayerState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import YouTube from "react-youtube";

import { Layout, Input, Card } from "antd";
import { stringFormat } from "JS/utils";
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
  const nextVideo = [...playlist].reverse().pop();

  if (videoPlayer && nextVideo) {
    videoPlayer.loadVideoById({
      videoId: nextVideo.videoId,
      startSeconds: 10
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
    />
  );
};

export default VideoPlayer;
