import { fetchArtwork } from '@/hooks';
import { idsDB } from '@/indexedDB/ArtworksDB';
import { Artwork } from '@/types';
import { useEffect, useState } from 'react';

import SingleArtwork from './Artwork';

const ArtworksList = () => {
  const [data, setData] = useState<Artwork[]>([]);
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

  //let data: unknown[] = [];
  let artworkObjects: JSX.Element[] = [];
  const get = async () => {
    for (let i = 0; i < pack.length; i++) {
      let x = await fetchArtwork(pack[i].toString());
      setData([...data, x]);
      //data.push(x);
    }
    // console.log(data);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      data.map((d) => {
        artworkObjects.push(
          <SingleArtwork key={d.objectID} artwork={d}></SingleArtwork>
        );
      });
    }
  }, [artworkObjects, data]);

  return <div>{artworkObjects}</div>;
};

export default ArtworksList;
