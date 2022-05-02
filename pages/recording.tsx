import RecordingContainer from "../components/recording/RecordingContainer"
import RecordingHeader from "../components/recording/RecordingHeader"

const Recording = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <RecordingHeader />
      <RecordingContainer />
    </div>
  )
}

export default Recording