import { useRef } from 'react';

import handleAudioRecordings from '../../../../domain/audio-reproduction/handleAudioRecordings';
import downloadIcon from '../../../../assets/downloadIcon.svg';
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
        <div className="trackGroup" key={track.id}>
          <audio
            id={track.id}
            src={track.audioUrl}
            ref={addToAudioRecordings}
            onPlay={() => toggleRecordingsPlaying(track.id)}
            controls
            preload="metadata"
          >
            Your browser is outdated, please update.
          </audio>

          <a className="btnDownload" download href={track.audioUrl}>
            <img id="downloadIcon" src={downloadIcon} alt="Download icon" />
          </a>
        </div>
      ))}
    </div>
  );
}
