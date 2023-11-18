import { useEffect } from 'react'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'

const Dictaphone = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition()

	useEffect(() => {
		console.log('transcript', transcript)
	}, [transcript])

	if (!browserSupportsSpeechRecognition) {
		return (
			<span>
				Browser doesn't support speech recognition.
			</span>
		)
	}

	return (
		<div>
			<p>Microphone: {listening ? 'on' : 'off'}</p>
			<button
				onClick={() =>
					SpeechRecognition.startListening({
						continuous: true,
						language: 'zh-CN',
					})
				}
			>
				Start
			</button>
			<button onClick={SpeechRecognition.stopListening}>
				Stop
			</button>
			<button onClick={resetTranscript}>Reset</button>
			<p>{transcript}</p>
		</div>
	)
}

export default Dictaphone
