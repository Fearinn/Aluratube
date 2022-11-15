export interface ITimeline {
  search?: string;
  children?: React.ReactNode;
}

export interface IPlaylists {
  jogos?: IVideo[];
  tecnologia?: IVideo[];
  esportes?: IVideo[];
  outros?: IVideo[];
}

export interface IVideo {
  title: string;
  url: string;
  playlist: string;
  thumb: string;
  youtubeId: string;
}
