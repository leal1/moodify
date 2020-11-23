import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './songInformation.css';

const SongInformation = (props) => {
    return(
			<div className='flex-container'>
				<div className='image'>
					<img src={props.song.image} alt='song'/>
    		</div>
				<div className='artist'>{props.song.artist}</div>
				<div className='song'>{props.song.name}</div>
			</div>
    )
}

export default SongInformation;