const recordAudioChunks = (media) => {
  const chunks = [];

  media.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  return chunks;
};

export default recordAudioChunks;
