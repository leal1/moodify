import {Pagination} from 'react-bootstrap';

const PlaylistModalPagination = ({playlists,displayPlaylistPage}) => {

    const playlistPaginationContent = (e,number) => {
        e.preventDefault();
        let start = 3*(number-1);
        let end = start + 3;
        displayPlaylistPage(playlists.slice(start,end));
    }
   
    let pageLength = Math.floor((playlists.length-1)/3) + 1;
    let items = [];
    for (let number = 1; number <=pageLength; number++) {
        items.push(
          <Pagination.Item key={number} onClick={(e)=>{playlistPaginationContent(e,number)}}>
            {number}
          </Pagination.Item>,
        );
    }

    return (
        <Pagination>{items}</Pagination>
    )
}

export default PlaylistModalPagination;