const getAudioSource = () => {
  const stream = navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  return stream;
};

export default getAudioSource;
