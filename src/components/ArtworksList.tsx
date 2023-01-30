/* eslint-disable react-hooks/exhaustive-deps */
import { useCollection } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';

import SingleArtwork from './Artwork';

const ArtworksList = () => {
  const [artworks, setArtworks] = useState<JSX.Element[]>([]);
  const [index, setIndex] = useState(0);
  const collection = useCollection(index);
  // const collection = useMemo(() => Refetch, [index]);

  // let artworkObjects: JSX.Element[] = [];
  const artworkObjects: JSX.Element[] = useMemo(() => {
    return [];
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  });

  const isBottom = (el: HTMLElement) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };
  const trackScrolling = () => {
    const wrappedElement = document.getElementById("main-container");
    if (wrappedElement)
      if (isBottom(wrappedElement)) {
        console.log("bottom reached");
        setIndex(index + 1);
        document.removeEventListener("scroll", trackScrolling);
      }
  };

  // const Refetch = () => {
  //   //console.log("refetch");
  //   useCollection(index);
  // };

  // useEffect(() => {
  //   Refetch();
  // }, [index]);

  useEffect(() => {
    (async () => {
      let a = await collection;
      a.map((d) => {
        artworkObjects.push(
          <SingleArtwork key={d.objectID} artwork={d}></SingleArtwork>
        );
      });
      setArtworks(artworkObjects);
      // setIndex(index + 1);
    })();
  }, [collection]);

  return (
    <div
      id="main-container"
      className="flex flex-wrap justify-center gap-y-10 gap-x-6"
      onScroll={trackScrolling}
    >
      {artworks}
    </div>
  );
};

export default ArtworksList;
