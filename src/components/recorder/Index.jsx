import './styles.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { audioTracks } from '../../data/audioTracks';
import AudioPlayer from './components/audio-player/Index';
import AnimatedMicrophone from './components/animated-microphone/Index';
import AudioControls from './components/audio-controls/Index';
import Timer from './components/timer/Index';

export default function Recorder() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState(null);
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

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert(`You can't record audio.`);
    }
  };

  getMicrophonePermission();

  const startRecording = () => {
    setIsRecording(true);
    const media = new MediaRecorder(stream);

    handleTimer();

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current.stop();

    handleTimer();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);

      audioTracks.push({
        id: uuidv4(),
        audioUrl: audioUrl,
      });

      setAudioChunks([]);
    };
  };

  return (
    <>
      <h2 className="appHeading">Audio Recorder</h2>

      <AnimatedMicrophone isRecording={isRecording} />

      <Timer timer={timer} />

      <AudioControls
        permission={permission}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />

      {audioTracks.length > 0 && <AudioPlayer audioTracks={audioTracks} />}
    </>
  );
}
