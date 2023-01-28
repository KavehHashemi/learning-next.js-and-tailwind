import React, { useEffect, useState } from 'react';

import styles from '../styles/Artwork.module.css';
import { TArtwork } from './MyComponent';

type ArtworkProps = {
  artwork: TArtwork;
};
const Artwork = ({ artwork }: ArtworkProps) => {
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
          <img src={artwork.primaryImageSmall} alt="" onClick={showURL}></img>
        </div>
        <div className={styles.footer}>
          <div>{artwork.artistDisplayName}</div>
          <div>{artwork.objectID}</div>
        </div>
      </div>
    );
  return null;
};

export default Artwork;