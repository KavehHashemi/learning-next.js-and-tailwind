import React, { useEffect, useState } from 'react';

import styles from '../styles/Artwork.module.css';
import { Artwork } from '../types';

type ArtworkProps = {
  artwork: Artwork;
};
const SingleArtwork = ({ artwork }: ArtworkProps) => {
  const [URL, setURL] = useState<string>(artwork.title);

  useEffect(() => {
    setURL(artwork.primaryImageSmall);
  }, [artwork]);

  const showURL = () => {
    console.log(URL);
  };
  if (artwork.primaryImageSmall !== "")
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div>{artwork.title}</div>
        </div>
        <div className={styles.content}>
          {/* <img src={artwork.primaryImageSmall} alt="" onClick={showURL}></img> */}
        </div>
        <div className={styles.footer}>
          <div>{artwork.artistDisplayName}</div>
          <div>{artwork.objectID}</div>
        </div>
      </div>
    );
  return <></>;
};

export default SingleArtwork;
