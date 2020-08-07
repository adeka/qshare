import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header } = Layout;

import { roomState, playlistState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import { Logo } from "Icons";
import "./header.scss";

const QShareHeader = props => {
  const roomName = useRecoilValue(currentRoomName);
  const history = useHistory();

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
        <Menu.Item key="1">
          <div className="logo">{Logo}</div>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            history.push("/");
          }}
        >
          Rooms
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default QShareHeader;
