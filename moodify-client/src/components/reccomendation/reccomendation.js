import {songs} from '../../util/fakeSongs';
import SongInformation from '../song_information/songInformation';
import './reccomendation.css';
import spotify from '../../api/spotify';

const Reccomendation = ({songClick,CurSongData}) => {
	const track = "spotify:track:0B2RttXEiyXsMeQ7mMP3EI";
    return(
		<div className='reccomendation-container'>
			<h2 className="reccomendation-header"> Reccomended tracks: </h2>
			<div className='reccomendation-grid'>
				{songs.map((song, index) => {
					return (
							<SongInformation song={song} CurSongData={CurSongData} songClick={songClick} track={track} key={index} />
					)
				})}
			</div>
		</div>
 
    )
}

export default Reccomendation;