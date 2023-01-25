/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import ArtworksList from './ArtworksList';

export type TArtwork = {
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
};

type TIds = {
  total: string;
  objectIDs: string[];
};

export async function request<TResponse>(
  url: string,
  config: RequestInit = { method: "GET" }
): Promise<TResponse> {
  const response = await fetch(url);
  const data = await response.json();
  return data as TResponse;
}

const MyComponent = () => {
  const [artworkIds, setArtworkIds] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      let res: unknown = await request(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&medium=Paintings&q=%22%22"
      );
      let data = res as TIds;
      setArtworkIds(data.objectIDs);
    })();
  }, []);

  return (
    <div className="p-10">
      {/* <div>{artworkIds.length}</div> */}
      <ArtworksList list={artworkIds}></ArtworksList>
    </div>
  );
};

export default MyComponent;
