import Image from "next/image"
import { MdArrowBackIosNew } from 'react-icons/md'

const KeyInst = () => {
  return (
    <>
      <h3 className="text-xl font-medium mb-5">
        # Select Virtual Instrument
      </h3>
      <div className="flex justify-between items-center px-20">
        <div className="h-12 w-12 bg-studion-100 opacity-60 rounded-full flex justify-center items-center">
          <MdArrowBackIosNew className="text-xl translate-x-[-2px]" />
        </div>
        <div className="flex gap-x-36">
          <span className='flex justify-center items-center overflow-hidden rounded-full h-20 w-20 bg-studion-100'>
            <Image src='/images/vocal.svg' alt="icon" width={80} height={80} />
          </span>
          <span className='flex justify-center items-center overflow-hidden rounded-full h-20 w-20 bg-studion-100'>
            <Image src='/images/main/guitar_icon.png' alt="icon" width={40} height={39} />
          </span>
          <span className='flex justify-center items-center overflow-hidden rounded-full h-20 w-20 bg-studion-100'>
            <Image src='/images/main/guitar_icon.png' alt="icon" width={40} height={39} />
          </span>
          <span className='flex justify-center items-center overflow-hidden rounded-full h-20 w-20 bg-studion-100'>
            <Image src='/images/main/drum_icon.png' alt="icon" width={40} height={30} />
          </span>
          <span className='flex justify-center items-center overflow-hidden rounded-full h-20 w-20 bg-studion-100'>
            <Image src='/images/main/piano_icon.png' alt="icon" width={40} height={20} />
          </span>
        </div>
        <div className="h-12 w-12 bg-studion-100 opacity-60 rounded-full flex justify-center items-center">
          <MdArrowBackIosNew className="text-xl rotate-180" />
        </div>
      </div>
      <p className="text-center mt-4 text-gray-400 text-xl">Guitar</p>
    </>
  )
}

export default KeyInst