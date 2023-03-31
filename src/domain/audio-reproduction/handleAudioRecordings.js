const handleAudioRecordings = (audioRef) => {
  return {
    addToRefs: (element) => {
      if (element && !audioRef.current.includes(element)) {
        audioRef.current.push(element);
      }
    },
    toggleRefsPlaying: (currentId) => {
      audioRef.current.forEach((track) => {
        if (track.id !== currentId) {
          track.pause();
        }
      });
    },
  };
};

export default handleAudioRecordings;
