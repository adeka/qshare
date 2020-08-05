import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import { routes } from "JS/routes";
import { Layout } from "antd";

import Home from "Components/home/Home";
import Header from "Components/header/Header";

const App = props => {
  return (
    <div className="app">
      <RecoilRoot>
        <Layout className="layout">
          <Header />
          <Home />
        </Layout>
      </RecoilRoot>
    </div>
  );
};

export default App;
