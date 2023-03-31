import { forwardRef } from 'react';

import downloadIcon from '../../../../assets/downloadIcon.svg';
import './styles.css';

const AudioRecording = forwardRef(({ track, togglePlay }, ref) => {
  return (
    <div className="trackGroup">
      <audio
        id={track.id}
        src={track.audioUrl}
        ref={ref}
        onPlay={() => togglePlay(track.id)}
        controls
        preload="metadata"
      >
        Your browser is outdated, please update.
      </audio>

      <a className="btnDownload" download href={track.audioUrl}>
        <img id="downloadIcon" src={downloadIcon} alt="Download icon" />
      </a>
    </div>
  );
});

export default AudioRecording;
