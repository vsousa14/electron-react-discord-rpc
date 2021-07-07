import React from 'react'

function PlayerDetails(props) {

    window.song_name = props.song.name;
    window.song_artist = props.song.artist;

    return (
        <div className="c-player-details">
            <div className="details-img">
                <img src={props.song.track_image} alt="" />
            </div>
            <h3 className="details-title">{props.song.name}</h3>
            <h4 className="details-artist">{props.song.artist}</h4>
            <p className="duration-current">00:00</p>
            <p className="duration-end">{props.song.duration}</p>
        </div>
    )
}
export default PlayerDetails
