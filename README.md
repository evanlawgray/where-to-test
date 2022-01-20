# WhereTo FrontEnd Engineering Test

To start app, install dependencies and run `npm start` from the CLI.

## Improvements
- Q: What changes would you need to make to allow the user to "star" their favorite tracks?
- A: A clickable star icon (or similar) could be added for each row within the TrackList component. This would be linked to a new piece of state e.g. "favouritedTracks", which could be organized by albums using an object/map for fast look-ups:
```
{
    [albumId]: {
        [trackId]: true // boolean represented whether or not the track has been favourited
    },
}
```
Clicking on the star icon would add a new key-value pair to the object representing favourites on the given album, and the star icon could be "filled-in"/coloured if the lookup on `favouritedTracks` using the albumId and trackId returns `true`;

- Q: How could the interface be made more responsive when a large number of albums must be loaded?
- A: Pagination could be implemented so that the first batch of n items is loaded on initial page load, and then when the user scroll past a given threshold (e.g n - 3), a request would be triggered to load the next page of data. Also, placeholder content could be rendered in the Gallery and Tracklist components while waiting for the API call to complete, perhaps with an animation or loading indicator to tell the user that the requested data is being fetched.

- Q: How could you make the album list scroll vertically along the left side if the window is narrow?
- A: I would change the layour by changin the View container layout to use either `flex-direction: row`, or remove `display: flex` entirely and allow its children to be positioned in the normal flow layout using `display: inline-block` to allow them to sit on the same line. I would then adjust the width/height of the respective elements to account for the narrow screen width, using relative units like % or vw/vh. This would require a revision to the scroll logic as well, since it is currently based on arithmetic using static pixel dimensions of the container and album cover `<img>` elements. The position of the album covers would be calculated using the gallery height, instead of width, which could be measured by attaching a ref to the gallery wrapper element and referencing its `offsetHeight` property. To calculate a % offset based on the viewing index, we could use `((index - viewingIndex) * (COVER_SIZE / galleryWrapperRef.current.offsetHeight))`. The resulting number would then be assigned to each element's `top` position property, rather than `left` as with the horizontal scrolling.

- Q: What other ideas do you have for improvements or features that could be added to the product?

1. Adjust the styling to be less "boxy", using fewer borders and square shapes, and add a complementary colour scheme to avoid gray backgrounds.
2. As mentioned above, make the layout responsive using relative units for sizing/positioning. Add media queries to adjust sizes and layouts of elements at different breakpoints, and switch from vertical scrolling layout on small screens to a horizontal scrolling layout on larger ones. This would require conditional logic in the Gallery component to transition between the vertical and horizontal scroll position calculation mentioned above once the screen reaches a certain width.
3. Infinite scrolling/pagination with virtualization of elements could be added to allow the user to view larger data sets without interrupting the UX. Placeholder content could be displayed to provide visual feedback and allow the UI to remain interactable during page loads.
4. A "Preview" feature could be added, allowing the user to stream a snippet of each song by clicking a speaker icon on each row on the tracklist.
5. Once a "favourites" data set is created via the "starring" functionality mentioned above, you could use the `getSimilarSongs` endpoint of the Subsonic API to construct a list of songs/albums similar to the user's favourites.
6. A "get more albums by this artist" feature could be implemented by adding a link/button to the Tracklist component, which would query the `getArtist` endpoint to retrieve a list of the artist's albums, and the `getAlbum` and `getCoverArt` endpoints to construct a scrolling gallery view for the selected artist only.
7. By adding an extra query to the `getArtistInfo` API, we could add an information section above the tracklist table providing the artists biography, image and a list of similar artists.
8. Add visual feedback to emphasize the currently selected album in the gallery (implemented in my example using box-shadow).


