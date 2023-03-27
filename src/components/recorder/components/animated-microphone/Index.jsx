
import microphoneIcon from '../../../../assets/microphoneIcon.svg';
import './styles.css';

export default function AnimatedMicrophone({ isRecording }) {
    return(
        <>
            <img className={`microphoneIcon ${isRecording === true && 'pulsating'}`}  src={microphoneIcon} alt="Microphone icon" />
        </>
    )
}