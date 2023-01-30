import { useArtworks } from '@/hooks';
import { idsDB } from '@/indexedDB/ArtworksDB';
import React, { useEffect } from 'react';

import ArtworksList from './ArtworksList';

const MainContainer = () => {
  const artworks = useArtworks();
  const { data, status, error } = artworks;

  useEffect(() => {
    (async () => {
      if ((await idsDB.ids.count()) === 0) {
        if (data) await idsDB.ids.add(data);
      }
    })();
  }, [data]);

  if (status === "loading") return <>Loading...</>;
  if (status === "success")
    return (
      <div className="p-4">
        {data.total}
        <ArtworksList></ArtworksList>
      </div>
    );
  if (status === "error") return <>{error.message}</>;
  if (status === "idle") return <>{status}</>;
  else return null;
};

export default MainContainer;
