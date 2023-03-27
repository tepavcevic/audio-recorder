import './styles.css'
import { useState, useRef, useEffect } from 'react';
import { timeFormatter } from '../../utils/timeFormatter';
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

  const recordingTimer = timeFormatter(timer);

  useEffect(() => {
    let IntervalId = 0;
    if(isRecording) {
      IntervalId = setInterval(() => setTimer(timer + 1), 1000)
    }

    return () => clearInterval(IntervalId);
  }, [isRecording, timer]);

  const resetTimer = () => {
    setTimer(0);
  }

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert(`You can't record audio.`);
    }
  };

  getMicrophonePermission();

  const startRecording = () => {
    setIsRecording(true);
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
    setIsRecording(false);
    mediaRecorder.current.stop();

    resetTimer();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: 'audio/mpeg-3'});
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);

      setAudioChunks([]);
    };
  };

  return (
    <>
      <h2 className='appHeading'>Audio Recorder</h2>

      <AnimatedMicrophone isRecording={isRecording} />

      <Timer
        recordingTimer={recordingTimer}
      />

      <AudioControls 
        permission={permission}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      
      {audio && <AudioPlayer audio={audio} />}
    </>
  );
}
