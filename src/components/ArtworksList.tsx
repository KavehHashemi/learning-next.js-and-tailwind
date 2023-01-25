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
        let res: unknown = await request(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        let data = res as TArtwork;
        return data;
      });
      let results = await Promise.all(promises);
      setArtworks(results);
    })();
  }, [list]);

  artworks.map((artwork) => {
    artworkObjects.push(
      <Artwork
        key={Math.floor(Math.random() * 100000)}
        artwork={artwork}
      ></Artwork>
    );
  });

  return (
    <div className="flex flex-wrap justify-evenly gap-5">{artworkObjects}</div>
  );
};

export default ArtworksList;
