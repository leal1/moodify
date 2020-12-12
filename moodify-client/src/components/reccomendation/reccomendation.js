import {songs} from '../../util/fakeSongs';
import SongInformation from '../song_information/songInformation';
import './reccomendation.css';
import spotify from '../../api/spotify';

const Reccomendation = ({songClick,curSongData,recSongs}) => {
    return(
		<div className='reccomendation-container'>
			<h2 className="reccomendation-header"> Reccomended tracks: </h2>
			<div className='reccomendation-grid'>
				{recSongs.map((song, index) => {
					return (
							//Maybe I should add more meaningful prop name (track, images, etc.) instead of all data about songs?
							<SongInformation song={song} curSongData={curSongData} songClick={songClick} key={index} />
					)
				})}
			</div>
		</div>
 
    )
}

export default Reccomendation;