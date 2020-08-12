import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { auth, provider, createUser } from "Client/firestore";
import { userState } from "JS/atoms";

import { Layout, Menu, Avatar, Dropdown } from "antd";
const { Header } = Layout;

import { roomState, activeVideoState, videoPlayerState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import { Logo, User } from "Icons";
import "Styles/header.scss";

const UserActions = (
  <Menu>
    <Menu.Item>Account</Menu.Item>
    <Menu.Item
      onClick={() => {
        auth.signOut();
      }}
    >
      Logout
    </Menu.Item>
  </Menu>
);

const UserMenuItem = props => {
  const user = useRecoilValue(userState);

  return (
    user && (
      <div key="3" className="login">
        <Dropdown overlay={UserActions}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {user.name}
          </a>
        </Dropdown>
        <Avatar src={user.photoUrl} />
      </div>
    )
  );
};

const SignInMenuItem = props => {
  const user = useRecoilValue(userState);

  return (
    !user && (
      <Menu.Item
        key="3"
        className="login"
        onClick={() => {
          auth.signInWithPopup(provider);
        }}
      >
        Login {User}
      </Menu.Item>
    )
  );
};

const RoomName = props => {
  const room = useRecoilValue(roomState);
  return <div className="roomName">{room?.name}</div>;
};
const AppHeader = props => {
  const [videoPlayer, updateVideoPlayer] = useRecoilState(videoPlayerState);
  const [activeVideo, updateActiveVideo] = useRecoilState(activeVideoState);

  const [user, updateUser] = useRecoilState(userState);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await createUser(userAuth);
      if (userAuth) {
        updateUser({
          name: userAuth.displayName,
          photoUrl: userAuth.photoURL,
          userId: userAuth.uid
        });
      } else {
        updateUser(null);
      }
    });
  }, []);

  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
        <Menu.Item key="1">
          <div className="logo">{Logo}</div>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            updateVideoPlayer(null);
            updateActiveVideo(null);
            history.push("/");
          }}
        >
          Rooms
        </Menu.Item>
        <RoomName />
        <SignInMenuItem />
        <UserMenuItem />
      </Menu>
    </Header>
  );
};

export default AppHeader;
