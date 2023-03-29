import AudioRecording from '../audio-recording/Index';
import './styles.css';

export default function AudioPlayer({ audioTracks }) {
  return (
    <div className="audioPlayer">
      <h2 className="appHeading">Your Recordings</h2>

      {audioTracks.map((track) => (
        <AudioRecording track={track} key={track.id} />
      ))}
    </div>
  );
}
