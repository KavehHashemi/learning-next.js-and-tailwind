import React, { useEffect } from 'react';


async function request<TResponse>(url: string,config: RequestInit = {method:"GET"}): Promise<TResponse> {
    const response = await fetch(url, config);
    const data = await response.json();
    return data as TResponse;
  } 

type TArt = {
    title: string;
    artistDisplayName: string;
    primaryImageSmall: string
}

// const request = async (url: string): Promise<object> => {
//     const res = await fetch(url)
//     const artwork = await res.json()
//     console.log(artwork);
    
//     return artwork
// }


// let artwork: TArt = { artistDisplayName: "", primaryImageSmall: "", title: "" }
//let artwork: object = { artistDisplayName: "", primaryImageSmall: "", title: "" }
let artwork: unknown;
let artist: string;
let title: string;
let img: string;
async function get() {
    artwork = await request('https://collectionapi.metmuseum.org/public/collection/v1/objects/25');
    artist=(artwork as TArt).artistDisplayName
    title=(artwork as TArt).title
    img=(artwork as TArt).primaryImageSmall
    console.log(artwork);
    console.log(artist);
    console.log(title);
    console.log(img);
    
}



const Component = () => {
    useEffect(() => {
        get()
    })
    return (
        <div className='text-white text-4xl font-bold '>
            <div>
                {artist && <p>{artist}</p>}
            </div>
            <div>
               
            </div>
            
        </div>
    )
}

export default Component