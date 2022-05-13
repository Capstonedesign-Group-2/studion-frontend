import { useEffect, useState } from "react";
import Navbar from "../components/recording/Navbar";
import RecordingContainer from "../components/recording/RecordingContainer"
import RecordingHeader from "../components/recording/RecordingHeader"
import { AudioFile } from "../components/room/player/mixer/Recorder";
import http from "../http";

const Recording = () => {
  const [audioFile, setAudioFile] = useState<AudioFile>()
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [isNav, setNav] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  
  function getUrlParams() :any {     
    var params:any = {};  
    
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
    	function(str, key, value) : any { 
        	params[key] = value; 
        }
    );    
    
    return params; 
  }

  useEffect(() => {
    let params = getUrlParams()
    if(!params.post_id) return
    async function getAudio() {
      setLoading(true)
      try {
        const res = await http.get(`/posts/show/${params.post_id}`)
        if(!res.data.post.audios[0].link) throw new Error('Can not get audio link!')
        const audio = await fetch(res.data.post.audios[0].link)
        console.log('fetch', audio)
        const blob = await audio.blob()
        setAudioFile({
          label: 'original',
          url: params.link as string,
          blob
        })
        setLoading(false)
      } catch(err) {
        console.error(err)
        setLoading(false)
      }
    }
    getAudio()
  }, [])
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {
        isNav &&
        <Navbar setNav={setNav} audioFiles={audioFiles} />
      }
      <RecordingHeader setNav={setNav} isNav={isNav}/>
      <RecordingContainer audioFile={audioFile} setAudioFile={setAudioFile} audioFiles={audioFiles} setAudioFiles={setAudioFiles} isLoading={isLoading} />
    </div>
  )
}

export default Recording