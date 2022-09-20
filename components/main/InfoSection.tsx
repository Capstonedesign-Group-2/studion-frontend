import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";

SwiperCore.use([Autoplay, EffectFade]);

import "swiper/css";
import "swiper/css/effect-fade";

import Image from "next/image";

const InfoSection = () => {
  return (
    <section className="bottom-60 text-center text-white bg-studion-600 w-screen flex-1 px-4 sm:px-6 lg:px-8">
      <article
        className="text-3xl font-medium mb-2"
        style={{ marginBottom: "56px" }}
      >
        <h2 className="text-3xl font-medium mb-2">Online Studio</h2>
        <h5 className="text-xl">スタジオン</h5>
      </article>
      <Swiper
        className="px-4 sm:px-8 lg:px-10 mb-14"
        slidesPerView={1}
        speed={500}
        autoplay={{ delay: 5500 }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        <SwiperSlide>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-left max-w-screen-lg mx-auto gap-20 xl:gap-10">
            <div className="relative flex justify-center h-64 max-w-lg w-full lg:max-w-none mx-auto">
              <div className="h-4/5 w-full rounded-md shadow-md bg-studion-300 relative overflow-hidden">
                <Image
                  src="/images/main/insts.png"
                  alt="insts"
                  layout="fill"
                ></Image>
              </div>
              <div className="absolute flex flex-col justify-center items-center bottom-0 h-2/5 w-11/12 rounded-lg shadow-lg bg-white">
                <p className="text-center text-black text-xl font-bold">
                  バーチャル楽器
                </p>
                <p className="text-gray-600">
                  ドラム、キーボード、ギター、ベース
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-white text-4xl font-medium mb-4">
                キーボードを使った合奏
              </h3>
              <div className="flex gap-4 mb-4">
                <span className="flex justify-center items-center overflow-hidden rounded-full h-12 w-12 bg-white">
                  <Image
                    src="/images/main/mic_icon.png"
                    alt="mic icon"
                    width={22}
                    height={40}
                  />
                </span>
                <span className="flex justify-center items-center overflow-hidden rounded-full h-12 w-12 bg-white">
                  <Image
                    src="/images/main/guitar_icon.png"
                    alt="guitar icon"
                    width={40}
                    height={39}
                  />
                </span>
                <span className="flex justify-center items-center overflow-hidden rounded-full h-12 w-12 bg-white">
                  <Image
                    src="/images/main/drum_icon.png"
                    alt="drum icon"
                    width={40}
                    height={30}
                  />
                </span>
                <span className="flex justify-center items-center overflow-hidden rounded-full h-12 w-12 bg-white">
                  <Image
                    src="/images/main/piano_icon.png"
                    alt="piano icon"
                    width={40}
                    height={20}
                  />
                </span>
              </div>
              <ul className="mb-4 flex flex-col">
                <li>楽器なしにキーボードで簡単に演奏</li>
                <li>今すぐできる</li>
                <li>様々なバーチャル楽器を選べる</li>
              </ul>
              <div className="flex justify-end">
                <div className="text-white bg-studion-300 duration-150 p-2.5 shadow-md cursor-pointer hover:bg-studion-200 transition-colors py-1.5 pt-2 flex items-center rounded-md">
                  <a className="px-2">詳細を見る →</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-left max-w-screen-lg mx-auto gap-20 xl:gap-10">
            <div className="relative flex justify-center h-64 max-w-lg w-full lg:max-w-none mx-auto">
              <div className="h-4/5 w-full rounded-md shadow-md bg-studion-300 relative overflow-hidden">
                <Image
                  src="/images/main/realtime.jpg"
                  alt="insts"
                  layout="fill"
                ></Image>
              </div>
              <div className="absolute flex flex-col justify-center items-center text-black bottom-0 h-2/5 w-11/12 rounded-lg shadow-lg bg-white">
                <p className="text-xl font-bold">オーディオインターフェース</p>
                <p className="text-gray-600">ボーカル、ギター、etc</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-white text-4xl font-medium mb-4">
                自分だけの楽器で合奏
              </h3>
              <ul className="mb-4 flex flex-col">
                <li>自分の楽器でさらに良いクオリティで演奏</li>
                <li>専門的なバンド</li>
              </ul>
              <div className="flex justify-end">
                <div className="text-white bg-studion-300 duration-150 p-2.5 shadow-md cursor-pointer hover:bg-studion-200 transition-colors py-1.5 pt-2 flex items-center rounded-md">
                  <a className="px-2">詳細を見る →</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default InfoSection;
