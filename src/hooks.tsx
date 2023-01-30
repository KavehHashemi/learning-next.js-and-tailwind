import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { idsDB } from './indexedDB/ArtworksDB';
import { Artwork, IDs } from './types';

export const useArtworks = () => {
  return useQuery<IDs, Error>("artworks", fetchArtworks);
};

const fetchArtworks = async (): Promise<IDs> => {
  const { data } = await axios.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&medium=Paintings&q=%22%22"
  );
  return data as IDs;
};

export const useArtwork = async (id: number) => {
  return useQuery<Artwork, Error>(
    "artwork",
    async () => await fetchArtwork(id)
  );
};

export const fetchArtwork = async (id: number): Promise<Artwork> => {
  const { data } = await axios.get(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  return data as Artwork;
};

const N = 6;

export const useCollection = async (idx: number) => {
  let pack: number[] = [];
  let index = idx * N;
  let ids = await idsDB.ids.get(1);
  if (ids?.objectIDs) {
    pack = getNIds(ids?.objectIDs, index);
  }
  let data = await getNArtworks(pack);
  return data;
};

const getNIds = (array: number[], index: number): number[] => {
  let pack: number[] = [];
  let m: number = N;
  console.log("from " + index + " to " + (index + m));
  if (index + N > array.length) {
    m = array.length - index + 1;
  }
  for (let i = index; i < index + m; i++) {
    pack.push(array[i]);
  }
  return pack;
};

const getNArtworks = async (pack: number[]) => {
  let data: Artwork[] = [];
  for (let i = 0; i < pack.length; i++) {
    let x = await fetchArtwork(pack[i]);
    data.push(x);
  }
  return data;
};
