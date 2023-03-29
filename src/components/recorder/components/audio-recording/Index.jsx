import downloadIcon from '../../../../assets/downloadIcon.svg';
import './styles.css';

export default function AudioRecording({ track }) {
  return (
    <div className="trackGroup">
      <audio id={track.id} src={track.audioUrl} preload="auto" controls>
        Your browser is outdated, please update.
      </audio>

      <a className="btnDownload" download href={track.audioUrl}>
        <img id="downloadIcon" src={downloadIcon} alt="Download icon" />
      </a>
    </div>
  );
}
