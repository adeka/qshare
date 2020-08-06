import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import firestore from "Client/firestore";

import { Layout, Menu } from "antd";
const { Header } = Layout;

import { roomState, playlistState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import { Logo } from "Icons";
import "./header.scss";

const QShareHeader = props => {
  const [playlist, updatePlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    const getVideos = async () => {
      const videos = await firestore
        .collection("rooms")
        .doc("wRDLEoQHH8VkmZFYBcBi")
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

  const roomName = useRecoilValue(currentRoomName);

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
        <Menu.Item key="1">
          <div className="logo">{Logo}</div>
        </Menu.Item>
        <Menu.Item key="2">{roomName}</Menu.Item>
      </Menu>
    </Header>
  );
};

export default QShareHeader;
