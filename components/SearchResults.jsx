import React from "react";
import SearchItem from "./SearchItem";

const SearchResults = ({ items, handleSelect }) => {
  return (
    <ul>
      {items &&
        items.map((item) => (
          <SearchItem key={item.id} {...item} handleSelect={handleSelect} />
        ))}
    </ul>
  );
};

export default SearchResults;
