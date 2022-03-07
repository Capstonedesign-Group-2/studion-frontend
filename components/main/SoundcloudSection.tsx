import Link from 'next/link'
import Album from '../soundCloud/Album'

const SoundcloudSection = () => {
  return (
    <div className="mt-28 mb-40 lg:mb-56">
      <div className="text-center mb-14 text-black">
        <h2 className="text-3xl font-medium mb-2">
          Sound Cloud
        </h2>
        <h5 className="text-xl">
          トップ音源
        </h5>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 max-w-lg mx-auto gap-3 md:gap-0 md:flex mb-10 text-white font-bold justify-center items-center md:space-x-8">
          <span className="bg-studion-300 md:px-6 w-full px-1 justify-center flex py-1 md:text-base text-sm cursor-pointer rounded-full">
            週間
          </span>
          <span className="text-studion-500 md:px-6 w-full px-1 justify-center flex py-1 md:text-base text-sm cursor-pointer rounded-full">
            月間
          </span>
        </div>
      </div>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className="lg:mx-auto grid grid-cols-1 lg:grid-cols-3 place-items-center gap-12 lg:gap-10 lg:max-w-screen-xl">
          {[1, 2, 3].map(post => (
            <div className='w-96 -translate-x-[12%] lg:translate-x-0 lg:w-full lg:pr-[25%]' key={post}>
              <Album post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-24'>
        <Link href='/soundcloud'>
          <a className='text-studion-500 text-center block text-lg font-bold'>もっと見る　→</a>
        </Link>
      </div>
    </div>
  )
}

export default SoundcloudSection