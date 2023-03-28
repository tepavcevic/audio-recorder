import AudioTrack from '../audio-track/Index';
import './styles.css';

export default function AudioPlayer({ audioTracks }) {
  return (
    <div className="audioPlayer">
      <h2 className="appHeading">Your Recordings</h2>

      {audioTracks.map((track) => (
        <AudioTrack track={track} key={track.id} />
      ))}
    </div>
  );
}
