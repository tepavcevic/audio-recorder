import { useRef } from 'react';

import handleAudioRecordings from '../../../../domain/audio-reproduction/handleAudioRecordings';
import AudioRecording from '../audio-recording/Index';
import './styles.css';

export default function AudioPlayer({ audioTracks }) {
  const audioRecordings = useRef([]);
  const handleRecordings = handleAudioRecordings(audioRecordings);

  const addToAudioRecordings = (element) => {
    handleRecordings.addToRefs(element);
  };

  const toggleRecordingsPlaying = (currentId) => {
    handleRecordings.toggleRefsPlaying(currentId);
  };

  return (
    <div className="audioPlayer">
      <h2 className="appHeading">Your Recordings</h2>

      {audioTracks.map((track) => (
        <AudioRecording
          track={track}
          key={track.id}
          ref={addToAudioRecordings}
          togglePlay={toggleRecordingsPlaying}
        />
      ))}
    </div>
  );
}
