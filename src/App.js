import React,{useState, useEffect} from 'react'


import Player from './components/Player/Player';

function App() {

  const [songs] = useState([
    {
    "name": "AC/DC - Thunderstruck",
    "artist": "AC/DC",
    "duration": "02:30",
    "track_image": "https://i.pinimg.com/originals/70/04/e4/7004e486c98f22a50fd513e7bdb5d583.jpg"
  },
  {
    "name": "Sweet Child O' Mine",
    "artist": "Guns N' Roses",
    "duration": "01:10",
    "track_image": "https://upload.wikimedia.org/wikipedia/pt/e/e5/Guns_N%27_Roses_-_Sweet_Child_o%27_Mine.jpeg"
  },
  {
    "name": "Fuoriclasse",
    "artist": "Capo Plaza",
    "duration": "02:15",
    "track_image": "https://lastfm.freetls.fastly.net/i/u/ar0/3f958f0e4d8aadafc110245feb4653ef.jpg"
  },
  {
    "name": "Somebody To Love",
    "artist": "Queen",
    "duration": "02:30",
    "track_image": "https://upload.wikimedia.org/wikipedia/en/d/dc/Stlove.jpg"
  }]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player 
      currentSongIndex={currentSongIndex}
      setCurrentSongIndex={setCurrentSongIndex}
      nextSongIndex={nextSongIndex}
      songs={songs}
      />
    </div>
  );
}

export default App;
