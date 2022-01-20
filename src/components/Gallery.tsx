import React, { useState } from 'react';
import styled from 'styled-components';

import { AlbumCover } from './AlbumCover';

const GALLERY_WIDTH = 1200;
const ALBUMS_LENGTH = 10;
const COVER_WIDTH = 150;

const CoversContainer = styled.div<{ viewingIndex: number }>`
    height: 100%;
    width: 1200px;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    // transform: translateX(${({ viewingIndex }) => 600 - (viewingIndex * COVER_WIDTH)}px);
    z-index: 1;
`;

const GalleryWrapper = styled.div`
    width: 75%;
    max-width: 1200px;
    height: 200px
    padding: 15px;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    background: lightgray;
`;

const ArrowButton = styled.div`
    height: 50px;
    width: 50px;
    border: 1 px solid black;
    background: gray;
    z-index: 2;
`;

export const Gallery = (props: any) => {
    const [viewingIndex, setViewingIndex] = useState(0);
    const { albums } = props;

    const albums1 = albums.slice(viewingIndex);
    const albums2 = albums.slice(0, viewingIndex);
    const albumsList = [].concat(albums1, albums2);

    return (
        <GalleryWrapper>
            <ArrowButton
                onClick={() => setViewingIndex((curr) => {
                    return curr > 0 ? curr - 1 : 9
                })}
            >
                &lArr;
            </ArrowButton>
            <CoversContainer viewingIndex={viewingIndex}>
                {
                    albumsList.map(({ image }: any) => (
                        <AlbumCover
                            src={image}
                        />
                    ))
                }
            </CoversContainer>
            <ArrowButton
                onClick={() => setViewingIndex((curr) => {
                    return  curr < 9 ? curr + 1 : 0
                })}
            >
                &rArr;
            </ArrowButton>
        </GalleryWrapper>
    );
};