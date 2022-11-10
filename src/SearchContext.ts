import { createContext, SetStateAction } from "react";

const SearchContext = createContext({
    search: "",
    setSearch: (() => {}) as React.Dispatch<SetStateAction<string>>
})

export default SearchContext