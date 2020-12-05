import './songInformation.css';
import * as spotify from '../../api/spotify';
const SongInformation = (props) => {

	const handleSongClick = () => {
		//Clicking on song will start the song
		spotify.startUserPlayback(props.track)
		.then(res => {
			//on song click, always set state PauseSong to true
			props.songClick();
			console.log(res);
		})
		//chain API call to get the currently playing song, and call Landing component setcursong function
		.then(res => {
			spotify.getUsersCurrentlyPlayingSong()
            .then(res => {
                props.CurSongData(res.data);
            })
		}).catch(err=> {
			console.log(err);
		});
	}
    return(
			<div onClick ={handleSongClick} className='song-flex-container'>
				<div className='image'>
					<img src={props.song.image} alt='song'/>
    		</div>
				<div className='track'>
					<div className='artist'>{props.song.artist}</div>
					<div className='song'>{props.song.name}</div>
				</div>

			</div>
    )
}

export default SongInformation;