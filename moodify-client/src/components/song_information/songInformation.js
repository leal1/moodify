import SongInformationDropdown from 'components/song_information/songInformationDropdown';
import './songInformation.css';
import * as spotify from 'api/spotify';

const SongInformation = (props) => {
	const handleSongClick = (e) => {
		//Don't play song if click on dropdown
		if(e.target.type ==='button' || e.target.type ==='submit') {
			return;
		}
		console.log(props.song);
		//Clicking on song will start the song
		spotify.startUserPlayback(props.song.uri)
		.then(response => {
			//on song click, always set state PauseSong to true
			props.songClick();
			props.setCurrentSongData(props.song);
			props.displayPlayorPause();
	
		})
	}
    return(
			<div className='song-flex-container' onClick ={handleSongClick}>
				<div className='image'>
					{props.song.album.images.length > 0 && <img className='song-img' src={props.song.album.images[0].url} alt='song'/>}
    			</div>
				<div className='track' >
					<div className='artist'>{props.song.artists.map(artist => artist.name).join(', ')}</div>
					<div className='song'>{props.song.name}</div>
				</div>
				
				<SongInformationDropdown
					songInformationData={props.songInformationData} 
					song={props.song} 
					onShowPlaylistModal={props.onShowPlaylistModal}
				/>
			</div>
    )
}

export default SongInformation;