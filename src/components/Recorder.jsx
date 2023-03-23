import { useState, useRef } from 'react';

export default function Recorder() {
  const [permission, setPermission] = useState(true);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const getMicrophonePermission = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setPermission(true);
    setStream(mediaStream);
  };

  getMicrophonePermission();

  const startRecording = async () => {
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream);

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus('inactive');
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);

      setAudioChunks([]);
    };
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {permission && recordingStatus === 'inactive' && (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          )}
          {recordingStatus === 'recording' && (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          )}
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
          </div>
        ) : null}
      </main>
    </div>
  );
}
