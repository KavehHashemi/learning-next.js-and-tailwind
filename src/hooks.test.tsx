import artworks from './artworks.json';
import objectIDs from './objectIDs.json';

type ArtworkTest = {
  index: number;
  artist: string;
  title: string;
};
const N = 6;
const getCollection = async (idx: number) => {
  let pack: number[] = [];
  let index = idx * N;
  let ids = objectIDs[0].objectIDs;
  if (ids) {
    pack = getNIds(ids, index);
  }
  let data = await getNArtworks(pack);
  return data;
};

const getNIds = (array: number[], index: number): number[] => {
  let pack: number[] = [];
  let m: number = N;
  //console.log("from " + index + " to " + (index + m));
  if (index + N > array.length) {
    m = array.length - index;
  }
  for (let i = index; i < index + m; i++) {
    pack.push(array[i]);
  }
  return pack;
};

const getNArtworks = async (pack: number[]) => {
  let data: ArtworkTest[] = [];
  for (let i = 0; i < pack.length; i++) {
    let x = artworks[pack[i]];
    data.push(x);
  }
  return data;
};

describe("useCollection", () => {
  it("paginates the artwork fetch", async () => {
    for (let i = 0; i < Math.floor(artworks.length / N); i++) {
      let a = await getCollection(i);
      expect(a.length).toEqual(N);
    }
    console.log(artworks.length - Math.floor(artworks.length / N) * N);

    let a = await getCollection(Math.floor(artworks.length / N));
    expect(a.length).toEqual(
      artworks.length - Math.floor(artworks.length / N) * N
    );
  });
});
