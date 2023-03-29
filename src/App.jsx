import Recorder from './components/recorder/Index';
import getAudioSource from './domain/microphone/getAudioSource';
import './App.css';

function App() {
  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        return await getAudioSource();
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert(`You can't record audio.`);
    }
  };

  return (
    <div className="App">
      <Recorder getMicrophonePermission={getMicrophonePermission} />
    </div>
  );
}

export default App;
