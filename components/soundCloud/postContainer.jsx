import Article from "./article"
import Player from "./player";
import { useState, useEffect } from "react";
import http from "../../http/index";
import { useSelector } from "react-redux";


const postContainer = () => {
    return (
        <div className="max-w-screen-xl mx-auto border-green-200">
            <div className="absolute top-2 right-2">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            <div className="mx-auto lg:flex">
                {/* 뮤직플레이어/사진 */}
                <div className="w-full max-w-lg mx-auto lg:mx-0 lg:max-w-xl bg-studion-500">
                    <Player />
                </div>
                {/* 컨텐츠, 코멘트 */}
                <div className="max-w-lg mx-auto lg:max-w-sm w-full">
                    <div className="">
                        <Article />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default postContainer;