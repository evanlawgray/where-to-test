import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Gallery } from './Gallery';

const Wrapper = styled.main`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`;

const getApi = (endPoint: any) => `http://demo.subsonic.org/rest/${endPoint}?u=guest&p=guest&v=1.12.0&c=whereto&f=json`;
const ALBUMS_LIST = `${getApi('getAlbumList2')}&type=recent&size=10`;
const getAlbumInfoApi = (id: any) => `${getApi('getAlbum')}&id=${id}`;
const getCoverArtApi = (id: any) => `${getApi('getCoverArt')}&id=${id}`;

async function getAlbums(setAlbums: any) {
    const albums = [];
    let response: any = await fetch(ALBUMS_LIST);
    response = await response.json();

    const albumInfo = await Promise.all(response['subsonic-response'].albumList2.album.map(async ({ id }: any) => {
        let response: any = await fetch(getAlbumInfoApi(id));
        response = await response.json();

        const { name, song, coverArt } = response['subsonic-response'].album;

        const imgSrc = getCoverArtApi(coverArt);

        return {
            name,
            tracks: song,
            image: imgSrc,
        };
    }));

    setAlbums(albumInfo);
}
export const View: React.FC<{}> = () => {
    const [albums, setAlbums] = useState([]);

    console.log('ALBUMS', albums);
    useEffect(() => {
        getAlbums(setAlbums);
    }, []);

    return (
        <Wrapper>
            {
                <Gallery albums={albums}/>
            }
        </Wrapper>
    );
};