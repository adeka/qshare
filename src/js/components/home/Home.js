import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentCountState } from "JS/selectors";
import { searchResultsState } from "JS/atoms";

import SearchResults from "Components/searchResults/SearchResults";
import { Layout, Input } from "antd";
const { Content } = Layout;
const { Search } = Input;

import "./home.scss";

import { SearchRequest } from "Client/apiClient";

const Home = props => {
  const [searchResults, updateSearchResults] = useRecoilState(
    searchResultsState
  );

  const search = async query => {
    try {
      const { data } = await SearchRequest(query);
      updateSearchResults(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Search
            placeholder="Search"
            onSearch={value => search(value)}
            style={{ width: 200 }}
          />
          <SearchResults />
        </div>
      </Content>
    </div>
  );
};

export default Home;
