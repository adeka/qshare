import React, { useEffect } from "react";
import { firestore, getUser, tryAddUserToRoom } from "Client/firestore";

import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  userState,
  roomState,
  searchResultsState,
  videoPlayerState,
  playlistState,
  lobbyState
} from "JS/atoms";

import SearchResults from "Components/SearchResults";
import Playlist from "Components/Playlist";
import Chat from "Components/Chat";
import Lobby from "Components/Lobby";
import VideoPlayer from "Components/VideoPlayer";

import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;

import "Styles/room.scss";

const Room = props => {
  const [playlist, updatePlaylist] = useRecoilState(playlistState);
  const [room, updateRoom] = useRecoilState(roomState);
  const [lobby, updateLobby] = useRecoilState(lobbyState);

  const { roomId } = useParams();
  const user = useRecoilValue(userState);
  if (user && !lobby.map(user => user.userId).includes(user.userId)) {
    tryAddUserToRoom(roomId, user.userId);
  }

  useEffect(() => {
    const setupRoom = async () => {
      const roomRef = await firestore.collection("rooms").doc(roomId);
      const videosRef = await roomRef.collection("videos").orderBy("index");
      const usersRef = await roomRef.collection("users");

      roomRef.onSnapshot(snapshot => {
        updateRoom({
          ...snapshot.data(),
          roomId: snapshot.id
        });
      });

      videosRef.onSnapshot(snapshot => {
        const videos = [];
        snapshot.forEach(doc => {
          videos.push({
            ...doc.data(),
            videoId: doc.id
          });
        });
        updatePlaylist(videos);
      });

      usersRef.onSnapshot(snapshot => {
        const userIds = [];

        snapshot.forEach(doc => {
          userIds.push(doc.id);
        });

        const getUsers = async () =>
          Promise.all(userIds.map(userId => getUser(userId)));

        getUsers().then(data => {
          updateLobby(data);
        });
      });
    };

    setupRoom();
  }, []);

  return (
    <div className="room">
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <SearchResults roomId={roomId} />
          </Col>
          <Col span={12}>
            <VideoPlayer />
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Lobby />
              </Col>
              <Col span={16}>
                <Chat />
              </Col>
            </Row>
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
