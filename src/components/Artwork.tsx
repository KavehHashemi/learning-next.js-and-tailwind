import React, { useEffect, useState } from 'react';

import styles from '../styles/Artwork.module.css';
import { TArtwork } from './MyComponent';

type ArtworkProps = {
  artwork: TArtwork;
};
const Artwork = ({ artwork }: ArtworkProps) => {
  const [title, setTitle] = useState<string>(artwork.title);

  useEffect(() => {
    setTitle(artwork.title);
  }, [artwork]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>{artwork.title}</div>
      </div>
      <div className={styles.content}>
        <img src={artwork.primaryImageSmall} alt=""></img>
      </div>
      <div className={styles.footer}>
        <div>{artwork.artistDisplayName}</div>
      </div>
    </div>
  );
};

export default Artwork;
