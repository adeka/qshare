import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { auth, provider, createUser } from "Client/firestore";
import { userState } from "JS/atoms";

import { Layout, Menu, Avatar, Dropdown } from "antd";
const { Header } = Layout;

import { roomState, playlistState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import { Logo, User } from "Icons";
import "./header.scss";

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
      <Menu.Item key="3" className="login">
        <Dropdown overlay={UserActions}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {user.name}
          </a>
        </Dropdown>
        <Avatar src={user.photoUrl} />
      </Menu.Item>
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
const AppHeader = props => {
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
            history.push("/");
          }}
        >
          Rooms
        </Menu.Item>
        <SignInMenuItem />
        <UserMenuItem />
      </Menu>
    </Header>
  );
};

export default AppHeader;
