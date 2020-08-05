import React from "react";
import { useRecoilValue } from "recoil";
import { searchResultsState } from "JS/atoms";

import { Layout, Input, Card } from "antd";
const { Content } = Layout;
const { Search } = Input;

import "./searchResults.scss";

// etag: "1TZSlkO8k78zfuL1g-y-qvojh18"
// id:
// kind: "youtube#video"
// videoId: "G-7U-FDql1A"
// __proto__: Object
// kind: "youtube#searchResult"
// snippet:
// channelId: "UCfIXdjDQH9Fau7y99_Orpjw"
// channelTitle: "Gorillaz"
// description: "Gorillaz present Song Machine | Season One Episode Five: PAC-MAN ft. ScHoolboy Q Follow your nearest Song Machine: https://gorill.az/songmachine Hit ..."
// liveBroadcastContent: "none"
// publishTime: "2020-07-20T18:30:10Z"
// publishedAt: "2020-07-20T18:30:10Z"
// thumbnails: {default: {…}, medium: {…}, high: {…}}
// title: "Gorillaz - PAC-MAN ft. ScHoolboy Q (Episode Five)"

const SearchResults = props => {
  const results = useRecoilValue(searchResultsState);
  console.log(results);
  return (
    <div className="searchResults">
      <div>results {results.length}</div>

      {results.map(result => {
        return (
          <Card key={result.id.videoId}>
            <img src={result.snippet.thumbnails.default.url} />
            {result.snippet.title}
          </Card>
        );
      })}
    </div>
  );
};

export default SearchResults;
