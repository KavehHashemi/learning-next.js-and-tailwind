import axios from 'axios';
import { useQuery } from 'react-query';

import { Artwork, IDs } from './types';

export const useArtworks = () => {
  return useQuery<IDs, Error>("artworks", fetchArtworks);
};

const fetchArtworks = async (): Promise<IDs> => {
  const { data } = await axios.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&medium=Paintings&q=%22%22"
  );
  return data as IDs;
};

// export const useArtwork = async (id: string) => {
//   return useQuery<Artwork, Error>("artwork", await fetchArtwork(id));
// };

export const fetchArtwork = async (id: string): Promise<Artwork> => {
  const { data } = await axios.get(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  return data as Artwork;
};
