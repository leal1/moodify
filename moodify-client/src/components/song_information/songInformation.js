import './songInformation.css';

const SongInformation = (props) => {
    return(
			<div className='song-flex-container'>
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