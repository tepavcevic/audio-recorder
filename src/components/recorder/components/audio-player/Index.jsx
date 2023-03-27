import './styles.css';

export default function AudioPlayer({ audio }) {
  return (
    <div className="audioPlayer">
      <audio src={audio} controls></audio>
      <button className="btn">
        <a className="btnLink" download href={audio}>
          Download
        </a>
      </button>
    </div>
  );
}
