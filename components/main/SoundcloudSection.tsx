import Link from 'next/link'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/slices'
import { IPost, IUser } from '../../types'
import Album from '../soundCloud/Album'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  rank: { week: IPost[], month: IPost[] }
}

const SoundcloudSection: FC<Props> = ({ rank }) => {
  const [selectedDate, setSelectDate] = useState('month')
  const userData = useSelector<RootState, IUser>((state) => state.user.data)
  const { t } = useTranslation("main")
  return (
    <div className="mt-28 mb-40 lg:mb-56">
      <div className="text-center mb-14 text-black">
        <h2 className="text-3xl font-medium mb-2">
          Sound Cloud
        </h2>
        <h5 className="text-xl">
          {t("soundCloud_subTitle")}
        </h5>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 max-w-lg mx-auto gap-3 md:gap-0 md:flex mb-10 text-white font-bold justify-center items-center md:space-x-8">
          <span className="text-studion-500 md:px-6 w-full px-1 justify-center flex py-1 md:text-base text-sm cursor-pointer rounded-full duration-100"
            style={selectedDate === 'week' ? { backgroundColor: '#009B9C', color: 'white' } : {}}
            onClick={() => setSelectDate('week')}
          >
            {t("soundCloud_week_1")}
          </span>
          <span className="text-studion-500 md:px-6 w-full px-1 justify-center flex py-1 md:text-base text-sm cursor-pointer rounded-full duration-100"
            style={selectedDate === 'month' ? { backgroundColor: '#009B9C', color: 'white' } : {}}
            onClick={() => setSelectDate('month')}
          >
            {t("soundCloud_month_1")}
          </span>
        </div>
      </div>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className="lg:mx-auto grid grid-cols-1 lg:grid-cols-3 place-items-center gap-12 lg:gap-10 lg:max-w-screen-xl">
          {
            (rank[(`${selectedDate}` as 'week' || 'month')]).length
              ? (rank[(`${selectedDate}` as 'week' || 'month')]).map(post => (
                <div className='w-96 -translate-x-[12%] lg:translate-x-0 lg:w-full lg:pr-[25%]' key={post.id}>
                  <Album post={post} userId={userData?.id} />
                </div>
              ))
              : (
                <>
                  <div></div>
                  <div className='py-10'>
                    <p>
                      {selectedDate === 'week' ? t("soundCloud_week_2") : t("soundCloud_month_2")} {t("soundCloud_message")}
                    </p>
                  </div>
                  <div></div>
                </>
              )
          }
        </div>
      </div>
      <div className='mt-24'>
        <Link href='/soundcloud'>
          <a className='text-studion-500 text-center block text-lg font-bold'>{t("soundCloud_btn")}</a>
        </Link>
      </div>
    </div>
  )
}

export default SoundcloudSection