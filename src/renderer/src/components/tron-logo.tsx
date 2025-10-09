"use client"

import { useEffect, useRef } from "react"
import tron from "../assets/tron.svg"

interface TronLogoProps {
  progress: number
}

export function TronLogo({ progress }: TronLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logoRef.current) {
      const rotation = (progress / 100) * 0
      logoRef.current.style.transform = `rotateY(${rotation}deg) scale(${1 + progress / 200})`
    }
  }, [progress])

  return (
    <div className="relative mb-6 w-24 h-24 perspective-1000">
      <div
        ref={logoRef}
        className="w-full h-full transition-transform duration-300 ease-out preserve-3d"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#ff5c4d] animate-pulse-slow flex justify-center items-center">
          <div className="absolute inset-2 rounded-full border-2 border-[#ff7a6d]/50" />
          <img
            className="absolute inset-0 w-20 p-4 left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] drop-shadow-2xl"
            src={tron}
          />
        </div>

        {/* Tron Logo SVG */}

        {/* Rotating Rings */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-[#ff5c4d] rounded-full -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#ff5c4d] rounded-full -translate-x-1/2" />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#ff5c4d] blur-2xl opacity-30 animate-pulse" />
      </div>
    </div>
  )
}
