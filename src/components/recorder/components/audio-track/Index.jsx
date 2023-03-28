import './styles.css';
import downloadIcon from '../../../../assets/downloadIcon.svg';

export default function AudioTrack({ track }) {
  return (
    <div className="trackGroup">
      <audio id={track.id} src={track.audioUrl} controls>
        Your browser is outdated, please update.
      </audio>

      <a className="btnDownload" download href={track.audioUrl}>
        <img id="downloadIcon" src={downloadIcon} alt="Download icon" />
      </a>
    </div>
  );
}
