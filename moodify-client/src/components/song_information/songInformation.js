import './songInformation.css';
import * as spotify from '../../api/spotify';
const SongInformation = (props) => {
	const handleSongClick = () => {
		//Clicking on song will start the song
		spotify.startUserPlayback(props.song.uri)
		.then(res => {
			//on song click, always set state PauseSong to true
			props.songClick();
			//set state for curSong data to display artist and song name that's playing
			props.curSongData(props.song);
		})
	}
    return(
			<div onClick ={handleSongClick} className='song-flex-container'>
				<div className='image'>
					{props.song.album.images.length > 0 && <img className='song-img' src={props.song.album.images[0].url} alt='song'/>}
    		</div>
				<div className='track'>
					<div className='artist'>{props.song.artists.map(artist => artist.name).join(', ')}</div>
					<div className='song'>{props.song.name}</div>
				</div>

			</div>
    )
}

export default SongInformation;