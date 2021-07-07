import React, {useState, useEffect} from 'react'
import PlayerControls from './PlayerControls'
import PlayerDetails from './PlayerDetails'


function Player(props) {

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
           console.log("IS PLAYING");
        } else {
            console.log("NOT PLAYING");
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }


    return (
        <div className="c-player">
            <h4>Playing now</h4>
            <PlayerDetails song={props.songs[props.currentSongIndex]} />
            <PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <p>Next up: <span>{props.songs[props.nextSongIndex].name} by {props.songs[props.nextSongIndex].artist}</span></p>
        </div>
    )
    
}



export default Player
