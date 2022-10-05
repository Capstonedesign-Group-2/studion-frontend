import Link from "next/link";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/slices";
import useTranslation from "next-translate/useTranslation";

const JoinSection = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  const { t } = useTranslation("main");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-screen-xl">
        <h1
          className="text-5xl tracking-tight leading-tight font-semibold text-gray-800 sm:text-5xl md:text-6xl relative text-center pt-40"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          Online Band.
          <br />
          Play your moment.
        </h1>
        <div className="relative z-10">
          <p className="text-gray-800 text-xl text-center lg:mt-8 mt-12 mb-7 lg:mb-12">
            {t("intro_1")}
            <br />
            {t("intro_2")}
          </p>
          {/* 시작 버튼 */}
          <div className="flex justify-center w-full">
            {userData ? (
              <Link href="/play">
                <a className="inline-flex items-center justify-center px-5 py-3 border-transparent text-base hover:bg-studion-600 hover:text-white leading-6 rounded-md text-gray-800 bg-transparent border-2 border-studion-600 transition duration-150 ease-in-out md:text-lg md:px-6 mb-[14vw]">
                  {t("roomListBtn")}
                </a>
              </Link>
            ) : (
              <Link href="/join">
                <a className="inline-flex items-center justify-center px-5 py-3 border-transparent text-base hover:bg-studion-600 hover:text-white leading-6 rounded-md text-gray-800 bg-transparent border-2 border-studion-600 transition duration-150 ease-in-out md:text-lg md:px-6 mb-[14vw]">
                  {t("startBtn")}
                </a>
              </Link>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default JoinSection;
