import React, { useEffect, useState } from 'react';

import Artwork from './Artwork';
import { request, TArtwork } from './MyComponent';

type ListProps = {
  list: string[];
};
const ArtworksList = ({ list }: ListProps) => {
  const [artworks, setArtworks] = useState<TArtwork[]>([]);
  let artworkObjects: JSX.Element[] = [];
  useEffect(() => {
    (async () => {
      let promises = list.map(async (id) => {
        let a: unknown = await request(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        let b = a as TArtwork;
        return b;
      });
      let results = await Promise.all(promises);
      setArtworks(results);
    })();
  }, [list]);

  if (artworks.length > 0) console.log(artworks);
  artworks.map((artwork) => {
    artworkObjects.push(<Artwork artwork={artwork}></Artwork>);
    console.log(artworkObjects.length);
  });

  return (
    <div className="flex flex-wrap justify-between gap-5">{artworkObjects}</div>
  );
};

export default ArtworksList;
