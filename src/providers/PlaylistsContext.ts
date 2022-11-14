import { IPlaylists } from "interfaces/timeline";
import { createContext, SetStateAction } from "react";

const PlaylistsContext = createContext({
    playlists: {} as IPlaylists,
    setPlaylists: (() => {}) as React.Dispatch<SetStateAction<IPlaylists>>
})

export default PlaylistsContext