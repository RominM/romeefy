export { };

declare global {
  interface IPlaylist {
    id: number;
    title: string;
    public: boolean;
    nb_tracks: number;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    checksum: string;
    tracklist: string;
    creation_date: string;
    add_date: string;
    mod_date: string;
    md5_image: string;
    picture_type: string;
    user: IPlaylistUser;
    type: string;
  }
  
  interface IPlaylistUser {
    id: number;
    name: string;
    tracklist: string;
    type: string;
  }
}