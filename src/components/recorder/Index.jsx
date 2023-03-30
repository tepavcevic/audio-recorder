import { useState } from 'react';

import mediaRecorderHandler from '../../domain/audio-recording/mediaRecorderHandler';
import handleRecordingTimer from '../../domain/time/handleRecordingTimer';
import AudioPlayer from './components/audio-player/Index';
import AnimatedMicrophone from './components/animated-microphone/Index';
import AudioControls from './components/audio-controls/Index';
import Timer from './components/timer/Index';
import './styles.css';

export default function Recorder({ getMicrophonePermission }) {
  const [tracks, setTracks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  const mediaRecorder = mediaRecorderHandler();
  const handleTimer = handleRecordingTimer();

  const startRecording = async () => {
    await mediaRecorder.startRecording(getMicrophonePermission);

    setIsRecording(true);
    handleTimer.start(setTimer);
  };

  const stopRecording = () => {
    mediaRecorder.stopRecording(setTracks);

    setIsRecording(false);
    handleTimer.stop(setTimer);
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
