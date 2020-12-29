import {Pagination} from 'react-bootstrap';
import * as spotify from 'api/spotify';
const SavedSongsModalPagination = ({savedSongs,displaySongPage,resetPlayer}) => {

    const songPaginationContent = (e,number) => {
        e.preventDefault();
        resetPlayer();
        spotify.pauseUserPlayback();
        let start = 5*(number-1);
        let end = start + 5;
        displaySongPage(savedSongs.slice(start,end));
    }
   
    let pageLength = Math.floor((savedSongs.length-1)/5) + 1;
    let items = [];
    for (let number = 1; number <=pageLength; number++) {
        items.push(
          <Pagination.Item key={number} onClick={(e)=>{songPaginationContent(e,number)}}>
            {number}
          </Pagination.Item>,
        );
    }

    return (
        <Pagination>{items}</Pagination>
    )
}

export default SavedSongsModalPagination;