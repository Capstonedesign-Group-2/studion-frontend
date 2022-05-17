import { useEffect, useState } from "react";
import Navbar from "../components/recording/Navbar";
import RecordingContainer from "../components/recording/RecordingContainer"
import RecordingHeader from "../components/recording/RecordingHeader"
import { AudioFile } from "../components/room/player/mixer/Recorder";
import http from "../http";
import wrapper from "../redux/store";
import { stayLoggedIn } from "../http/stay";
import { useRouter } from "next/router";

const Recording = () => {
  const [audioFile, setAudioFile] = useState<AudioFile>()
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [isNav, setNav] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  async function getAudio(postId: string) {
    setLoading(true)
    try {
      const res = await http.get(`/posts/show/${postId}`)
      const audioLink = res.data.post.audios[0].link
      if (!audioLink) throw new Error('Can not get audio link!')
      const audio = await fetch(audioLink)
      const blob = await audio.blob()
      setAudioFile({
        label: 'original',
        url: audioLink as string,
        blob
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    const postId = router.query.post_id
    if (postId && typeof (postId) === 'string') {
      getAudio(postId)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {
        isNav &&
        <Navbar setAudioFiles={setAudioFiles} audioFiles={audioFiles} />
      }
      <RecordingHeader setNav={setNav} isNav={isNav} />
      <RecordingContainer
        audioFile={audioFile}
        setNav={setNav}
        setAudioFile={setAudioFile}
        audioFiles={audioFiles}
        setAudioFiles={setAudioFiles}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store)
  if (!store.getState().user.data) { // 유저 데이터가 없으면 '/login'으로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default Recording