import {Dropdown, DropdownButton} from 'react-bootstrap';
import './songInformation.css';
const SongInformationDropdown = (props) => {

    const handleAddSongClick = (e) => {
        e.preventDefault();
        props.songInformationData(props.song);
        props.onShowPlaylistModal();
        
    }
    
    return(
        <DropdownButton size="sm" className="dropdownStyle">
             <Dropdown.Item as="button" onClick={handleAddSongClick} >Add to playlist</Dropdown.Item>
             <Dropdown.Item as="button">Add to queue</Dropdown.Item>
         </DropdownButton>
    )
}
export default SongInformationDropdown;