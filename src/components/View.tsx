import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Gallery } from './Gallery';
import { TrackList } from './TrackList';

const Wrapper = styled.main`
    height: 100%;
    width: 100%;
    padding: 25px;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`;

const LoadingText = styled.p`
    font-size: 22px;
    font-style: italic;
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
    const [viewingIndex, setViewingIndex] = useState(0);

    const selectedAlbum = useMemo(() => albums[viewingIndex], [viewingIndex, albums]);

    useEffect(() => {
        getAlbums(setAlbums);
    }, []);

    return (
        <Wrapper>
            {
                !!albums.length
                    ? (
                        <>
                        <Gallery
                            albums={albums}
                            viewingIndex={viewingIndex}
                            setViewingIndex={setViewingIndex}
                        />
                        <TrackList album={selectedAlbum}/>
                        </>
                    )
                    : <LoadingText>Loading...</LoadingText>
            }
        </Wrapper>
    );
};