import { fetchArtwork } from '@/hooks';
import { idsDB } from '@/indexedDB/ArtworksDB';
import { Artwork } from '@/types';
import { useEffect, useState } from 'react';

import SingleArtwork from './Artwork';

const ArtworksList = () => {
  const [artworks, setArtworks] = useState<JSX.Element[]>([]);
  let pack: number[] = [];
  useEffect(() => {
    (async () => {
      let ids = await idsDB.ids.get(1);
      for (let i = 0; i < 6; i++) {
        if (ids !== undefined) {
          let a = ids.objectIDs[i];
          if (!pack.includes(a)) pack.push(a);
        }
      }
      await get();
    })();
  }, []);

  let data: Artwork[] = [];
  let artworkObjects: JSX.Element[] = [];
  const get = async () => {
    for (let i = 0; i < pack.length; i++) {
      let x = await fetchArtwork(pack[i].toString());
      if (!data.includes(x)) data.push(x);
    }
    data.map((d) => {
      artworkObjects.push(
        <SingleArtwork key={d.objectID} artwork={d}></SingleArtwork>
      );
    });
    setArtworks(artworkObjects);
  };

  return <div className="flex justify-evenly gap-4">{artworks}</div>;
};

export default ArtworksList;
