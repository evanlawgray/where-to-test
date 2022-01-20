import React from 'react';
import styled from 'styled-components';

const Cover = styled.img`
    height: 150px;
    width: 150px;
`;

export const AlbumCover = (props: any) => {
    return (
        <Cover
            src={props.src}
        />
    );
};