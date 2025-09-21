import { fetchDeezer } from "./fetchDeezer";

export const deezerPlaylist = () =>{
  return {
    getById: (id: number) => fetchDeezer(`/playlist/${id}`).fetchData(),
    getTracks: (id: number) => fetchDeezer(`/playlist/${id}/tracks`).fetchData(),
    getByArtistId: async (artistId: number) => {
      try {
        const topTracksRes = await fetchDeezer(`/artist/${artistId}/top?limit=5`).fetchData();
        if (!topTracksRes?.data?.length) return { data: [], error: null };
      
        const playlistsMap = new Map<number, any>();
      
        for (const track of topTracksRes.data) {
          const query = `${track.title} ${track.artist.name}`;
          const { data, error } = await fetchDeezer(`/search/playlist?q=${encodeURIComponent(query)}`).fetchData();
        
          if (!data || error) continue;
        
          data.forEach((playlist: any) => {
            const fans = playlist.nb_fans || 0;
            const nbTracks = playlist.nb_tracks || 0;
          
            if (!playlistsMap.has(playlist.id) && fans >= 50 && nbTracks >= 3) {
              playlistsMap.set(playlist.id, playlist);
            }
          });
        }
      
        if (playlistsMap.size === 0) {
          const firstTrack = topTracksRes.data[0];
          const fallback = await fetchDeezer(`/search/playlist?q=${encodeURIComponent(firstTrack.title)}`).fetchData();
          fallback.data?.forEach((playlist: any) => {
            const nbTracks = playlist.nb_tracks || 0;
            if (!playlistsMap.has(playlist.id) && nbTracks >= 3) playlistsMap.set(playlist.id, playlist);
          });
        }
      
        const result = Array.from(playlistsMap.values())
          .sort((a, b) => {
            const nbTracksA = a.nb_tracks || 0;
            const nbTracksB = b.nb_tracks || 0;
            const fansA = a.nb_fans || 0;
            const fansB = b.nb_fans || 0;
            const dateA = a.creation_date ? new Date(a.creation_date).getTime() : 0;
            const dateB = b.creation_date ? new Date(b.creation_date).getTime() : 0;
          
            return (
              nbTracksB - nbTracksA ||
              fansB - fansA ||
              dateB - dateA
            );
          })
          .slice(0, 10);
        
        return { data: result, error: null };
      } catch (err: any) {
        return { data: null, error: err.message || err };
      }
    }
  }
}
