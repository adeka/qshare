import React, { useEffect } from "react";
import { firestore } from "Client/firestore";

import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { searchResultsState, videoPlayerState, playlistState } from "JS/atoms";
import YouTube from "react-youtube";

import SearchResults from "Components/searchResults/SearchResults";
import Playlist from "Components/playlist/Playlist";
import Chat from "Components/chat/Chat";
import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;
const { Search } = Input;

import "./room.scss";

import { SearchRequest } from "Client/apiClient";

const Room = props => {
  const [videoPlayer, updateVideoPlayer] = useRecoilState(videoPlayerState);
  const [playlist, updatePlaylist] = useRecoilState(playlistState);
  const [searchResults, updateSearchResults] = useRecoilState(
    searchResultsState
  );

  const { roomId } = useParams();

  useEffect(() => {
    const getVideos = async () => {
      const videos = await firestore
        .collection("rooms")
        .doc(roomId)
        .collection("videos")
        .orderBy("index")
        .onSnapshot(snapshot => {
          const playlist = [];
          snapshot.forEach(doc => {
            playlist.push({
              ...doc.data(),
              videoId: doc.id
            });
          });
          updatePlaylist(playlist);
        });
    };
    getVideos();
  }, []);

  const search = async query => {
    try {
      const { data } = await SearchRequest(query);
      updateSearchResults(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="room">
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Search placeholder="Search" onSearch={value => search(value)} />
            <SearchResults roomId={roomId} />
          </Col>
          <Col span={12}>
            <YouTube
              className="player"
              // videoId={null}
              opts={{}}
              onReady={e => {
                updateVideoPlayer(e.target);
              }}
            />
            <Chat />
          </Col>
          <Col span={6}>
            <Playlist />
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default Room;
