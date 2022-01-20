import React, { useState } from 'react';
import styled from 'styled-components';

const GALLERY_WIDTH = 1500;
const COVER_SIZE = 150;

const GalleryWrapper = styled.div`
    width: auto;
    height: auto;
    min-height: 180px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow: hidden;
`;

const CoversContainer = styled.div<{ viewingIndex: number }>`
    background: #EEEEEE;
    height: 180px;
    width: ${GALLERY_WIDTH}px;
    margin: 0 10px;
    padding: 15px;
    border: 1px solid black;
    border-bottom: none;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
`;

const ArrowButton = styled.div`
    height: 50px;
    width: 50px;
    border: 1 px solid black;
    background: #B0B0B0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`;

const Cover = styled.img<{ position: number; isSelected: boolean }>`
    height: ${COVER_SIZE}px;
    width: ${COVER_SIZE}px;
    border: 1px solid white;
    box-sizing: border-box;
    position: absolute;
    left: ${({ position }) => `${position}px`};
    transition: left 250ms linear;

    ${({ isSelected }) => isSelected && `
        box-shadow: 2px 4px 10px gray;
    `}
`;

export const Gallery = (props: any) => {
    const {
        albums,
        viewingIndex,
        setViewingIndex,
    } = props;

    return (
        <GalleryWrapper>
            <ArrowButton
                onClick={() => setViewingIndex((curr: number) => curr > 0 ? curr - 1 : 9)}
            >
                &lArr;
            </ArrowButton>
            <CoversContainer viewingIndex={viewingIndex}>
                {
                    albums.map(({ image }: any, index: number) => {
                        const position = (
                            ((index - viewingIndex) * (COVER_SIZE + 15))
                            + ((GALLERY_WIDTH / 2) - (COVER_SIZE / 2))
                        );

                        return (
                            <Cover
                                src={image}
                                position={position}
                                isSelected={index === viewingIndex}
                            />
                        );
                    })
                }
            </CoversContainer>
            <ArrowButton
                onClick={() => setViewingIndex((curr: number) => curr < 9 ? curr + 1 : 0)}
            >
                &rArr;
            </ArrowButton>
        </GalleryWrapper>
    );
};