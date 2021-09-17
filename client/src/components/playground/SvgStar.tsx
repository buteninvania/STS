import React from "react";
import p from "./playground.module.css"

const SvgStar = () => {

    return (
        <svg onMouseOver={} className={p.star} width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <path
                    d="M15.1337 3L17.8578 11.3842H26.6735L19.5415 16.5658L22.2657 24.95L15.1337 19.7683L8.00168 24.95L10.7259 16.5658L3.59386 11.3842H12.4095L15.1337 3Z"
                    fill="#919191"/>
            </g>
            <defs>
                <filter id="filter0_d" x="0.59375" y="0" width="29.0796" height="27.95" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.42 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

export default SvgStar;