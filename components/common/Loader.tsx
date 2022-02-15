import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Audio
      height="100"
      width="100"
      color='#007E8E'
      ariaLabel='loading'
    />
  )
}

export default Loader
