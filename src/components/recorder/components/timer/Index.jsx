import './styles.css';
import timeFormatter from '../../../../domain/time/timeFormatter';

export default function Timer({ timer }) {
  const recordingTimer = timeFormatter(timer);

  return <p className="timer">{recordingTimer}</p>;
}
