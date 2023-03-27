import './styles.css';

export default function AudioControls({ permission, isRecording, startRecording, stopRecording }) {
    return(
        <div className="audioControls">
            {permission && !isRecording && (
            <button className='btn' onClick={startRecording} type="button">
                Start Recording
            </button>
            )}
            {permission && isRecording && (
            <button className='btn' onClick={stopRecording} type="button">
                Stop Recording
            </button>
            )}
      </div>
    )
}