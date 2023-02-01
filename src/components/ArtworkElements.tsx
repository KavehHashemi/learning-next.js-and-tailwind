import { Artwork } from '@/types';
import React, { useEffect, useState } from 'react';

type props = {
  list: Artwork[];
};
const ArtworkElements = ({ list }: props) => {
  const [artworks, setArtworks] = useState(list);
  useEffect(() => {
    setArtworks(list);
  }, [list]);

  return <div>ArtworkElements</div>;
};

export default ArtworkElements;
