import './styles.css';

export default function AudioControls({ isRecording, startRecording, stopRecording }) {
  return (
    <div className="audioControls">
      {!isRecording && (
        <button className="btn" onClick={startRecording} type="button">
          Start Recording
        </button>
      )}
      {isRecording && (
        <button className="btn" onClick={stopRecording} type="button">
          Stop Recording
        </button>
      )}
    </div>
  );
}
