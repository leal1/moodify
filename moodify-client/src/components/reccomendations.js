import {songs} from '../util/fakeSongs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SongInformation from './song_information/songInformation';

const arrayChunk = require('lodash.chunk');

const Reccomendations = () => {
    const chunkedSongs = arrayChunk(songs, 3);
    console.log(chunkedSongs);
    return(
		<Container >
			{chunkedSongs.map((songChunk, rowIndex) => {
				return (
					<Row key={rowIndex}>
						{songChunk.map((song, colIndex) => {
							return (
								<Col key={colIndex}>
									<SongInformation song={song} />
								</Col>
							)
						})}
					</Row>
				)})}
		</Container>
 
    )
}

export default Reccomendations;