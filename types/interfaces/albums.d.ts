export { };

declare global {
  interface IAlbum {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    release_date: string,
    genre_id: string,
    record_type: string,
    md5_image: string;
    tracklist: string;
    type: string;
  }
}