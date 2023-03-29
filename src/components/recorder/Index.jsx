import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import recordAudioChunks from '../../domain/audio-recording/recordAudioChunks';
import AudioPlayer from './components/audio-player/Index';
import AnimatedMicrophone from './components/animated-microphone/Index';
import AudioControls from './components/audio-controls/Index';
import Timer from './components/timer/Index';
import './styles.css';

export default function Recorder({ getMicrophonePermission }) {
  const mediaRecorder = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const handleTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      setTimer(0);
    } else {
      const newIntervalId = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
      setIntervalId(newIntervalId);
    }
  };

  const startRecording = async () => {
    const stream = await getMicrophonePermission();
    if (!stream) {
      return alert('Something went wrong with the audio stream');
    }

    setIsRecording(true);
    handleTimer();

    const media = new MediaRecorder(stream, { type: 'audio/webm' });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    const localAudioChunks = recordAudioChunks(media);

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current.stop();

    handleTimer();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);

      setTracks((tracks) => [...tracks, { id: uuidv4(), audioUrl: audioUrl }]);

      setAudioChunks([]);
    };
  };
  return (
    <>
      <h2 className="appHeading">Audio Recorder</h2>

      <AnimatedMicrophone isRecording={isRecording} />

      <Timer timer={timer} />

      <AudioControls
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />

      {tracks.length > 0 && <AudioPlayer audioTracks={tracks} />}
    </>
  );
}
