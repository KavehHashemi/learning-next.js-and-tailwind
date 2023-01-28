/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ArtworksList from './ArtworksList';

export type TArtwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
};

type TIds = {
  total: string;
  objectIDs: string[];
};

// export async function request<TResponse>(
//   url: string,
//   config: RequestInit = { method: "GET" }
// ): Promise<TResponse> {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data as TResponse;
// }
export async function request<TArtwork>(
  url: string,
  config: RequestInit = { method: "GET" }
): Promise<TArtwork> {
  const { data } = await axios.get(url);
  //const data = await response.json();
  return data as TArtwork;
}

const MyComponent = () => {
  const [artworkIds, setArtworkIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      let res: unknown = await request(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&medium=Paintings&q=%22K%22"
      );
      let data = res as TIds;
      setArtworkIds(data.objectIDs);
    })();
  }, []);

  useEffect(() => {
    console.log(artworkIds.length);
  }, [artworkIds]);

  return (
    <div className="p-10">
      <ArtworksList list={artworkIds}></ArtworksList>
    </div>
  );
};

export default MyComponent;
