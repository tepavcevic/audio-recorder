import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import recordAudioChunks from './recordAudioChunks';

const mediaRecorderHandler = () => {
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);

  return {
    startRecording: async (getMicrophonePermission) => {
      const stream = await getMicrophonePermission();
      if (!stream) {
        return alert('Something went wrong with the audio stream');
      }

      const media = new MediaRecorder(stream, { type: 'audio/webm' });
      mediaRecorder.current = media;
      mediaRecorder.current.start();

      const localAudioChunks = recordAudioChunks(media);

      setAudioChunks(localAudioChunks);
    },
    stopRecording: (setTracks) => {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        setTracks((tracks) => [...tracks, { id: uuidv4(), audioUrl: audioUrl }]);

        setAudioChunks([]);
      };
    },
  };
};

export default mediaRecorderHandler;
