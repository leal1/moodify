import {songs} from '../../util/fakeSongs';
import SongInformation from '../song_information/songInformation';
import './reccomendation.css';


const Reccomendation = () => {
    return(
		<div className='reccomendation-container'>
			<h2 className="reccomendation-header"> Reccomended tracks: </h2>
			<div className='reccomendation-grid'>
				{songs.map((song, index) => {
					return (
							<SongInformation song={song} key={index} />
					)
				})}
			</div>
		</div>
 
    )
}

export default Reccomendation;