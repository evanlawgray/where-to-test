import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 10px;
`;


{/* <album id="1768" name="Duets" coverArt="al-1768" songCount="2" created="2002-11-09T15:44:40" duration="514" artist="Nik Kershaw" artistId="829"/> */}
export const TrackList = (props: any) => {
    const { album } = props;

    return (
        <Wrapper>
            <h2>{ album.name }</h2>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Track</th>
                </tr>
            </thead>
            <tbody>
                {
                    album.tracks.map((track: any, index: any) => {
                       return (
                        <tr>
                            <td colSpan={1}>{ index + 1 }</td>
                            <td colSpan={1}>{ track.title }</td>
                        </tr>
                       );
                    })
                }
            </tbody>
        </table>
        </Wrapper>
    );
};