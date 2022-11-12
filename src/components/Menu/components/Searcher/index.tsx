import React, { useContext } from "react";
import SearchContext from "providers/SearchContext";
import StyledSearcher from "./styles";

function Searcher() {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <StyledSearcher>
      <label aria-label="Buscar" htmlFor="searcher">
        🔎
      </label>
      <input
        placeholder="Busque..."
        id="searcher"
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          console.log(search + "testando");
        }}
      ></input>
    </StyledSearcher>
  );
}

export default Searcher;
