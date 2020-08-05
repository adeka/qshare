import React from "react";

import { Layout, Menu } from "antd";
const { Header } = Layout;

import { Logo } from "Icons";
import "./header.scss";

const QShareHeader = props => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">
          <div className="logo">{Logo}</div>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default QShareHeader;
