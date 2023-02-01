import { getCollection } from '@/hooks';
import { useEffect, useState } from 'react';

import SingleArtwork from './Artwork';

// import { BottomScrollListener } from 'react-bottom-scroll-listener';

const ArtworksList = () => {
  const [index, setIndex] = useState<number>(0);
  const [artworks, setArtworks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log(index);
    let artworkObjects: JSX.Element[] = [];
    (async () => {
      let a = await getCollection(index);

      console.log(`collection : ${a}`);

      a.map((d) => {
        artworkObjects.push(
          <SingleArtwork key={d.objectID} artwork={d}></SingleArtwork>
        );
      });
      setArtworks(artworkObjects);
    })();
  }, [index]);

  return (
    <>
      <div
        id="main-container"
        className="flex flex-wrap justify-center gap-y-10 gap-x-6"
      >
        {artworks}
        <button
          onClick={() => {
            if (index) setIndex(index + 1);
          }}
        >
          next
        </button>
      </div>
      {/* <BottomScrollListener onBottom={() => setIndex(index + 1)} /> */}
    </>
  );
};

export default ArtworksList;
