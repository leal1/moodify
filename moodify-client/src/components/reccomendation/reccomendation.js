import {songs} from 'util/fakeSongs';
import SongInformation from 'components/song_information/songInformation';
import './reccomendation.css';
import spotify from 'api/spotify';

const Reccomendation = ({songClick, setCurrentSongData, recSongs, onShowPlaylistModal, displayPlayorPause, songInformationData}) => {
    return(
		<div className='reccomendation-container'>
			<h2 className="reccomendation-header"> Reccomended tracks: </h2>
			<div className='reccomendation-grid'>
				{recSongs.map((song, index) => {
					return (
							//Maybe I should add more meaningful prop name (track, images, etc.) instead of all data about songs?
							<SongInformation 
								displayPlayorPause={displayPlayorPause} 
								onShowPlaylistModal={onShowPlaylistModal} 
								song={song} 
								setCurrentSongData={setCurrentSongData} 
								songInformationData={songInformationData} 
								songClick={songClick} 
								key={index} 
							/>
					)
				})}
			</div>
		</div>
 
    )
}

export default Reccomendation;