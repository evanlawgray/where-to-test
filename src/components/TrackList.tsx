import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 10px;
    width: 1500px;
    border: 1px solid black;
    box-sizing: border-box;

    * {
        text-align: left;
    }

    h2 {
        margin: 0 0 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead {
        background-color: #B0B0B0;
    }

    th, td {
        border: 1px solid black;
        padding-left: 5px;
    }

    th:first-child, td:first-child {
        width: 20%
    }

    th:nth-child(2), td:nth-child(2) {
        width: 80%;
    }
`;


{/* <album id="1768" name="Duets" coverArt="al-1768" songCount="2" created="2002-11-09T15:44:40" duration="514" artist="Nik Kershaw" artistId="829"/> */}
export const TrackList = (props: any) => {
    const { album } = props;

    return (
        <Wrapper>
            {
                album && (
                    <>
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
                                        <tr key={track.title}>
                                            <td colSpan={1}>{ index + 1 }</td>
                                            <td colSpan={1}>{ track.title }</td>
                                        </tr>
                                    );
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                )
            }
        </Wrapper>
    );
};