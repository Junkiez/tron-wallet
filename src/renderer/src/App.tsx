'use client'

import { useEffect, useState } from 'react'
import { SpaceBackground } from '@/components/space-background'
import { TronLogo } from './components/tron-logo'
import { FloatingElements } from './components/floating-elements'

const loadingHeaders = [
  { min: 0, max: 4, message: 'Network Initialization' },
  { min: 4, max: 10, message: 'Network Connection' },
  { min: 10, max: 25, message: 'Chain Synchronization' },
  { min: 35, max: 37, message: 'Block Downloading' },
  { min: 37, max: 50, message: 'Data Validation' },
  { min: 50, max: 75, message: 'Chain Update' },
  { min: 75, max: 90, message: 'Integrity Verification' },
  { min: 90, max: 100, message: 'Finalizing Sync' }
]

const loadingMessages = [
  { min: 0, max: 2, message: 'Preparing TRON environment' },
  { min: 2, max: 3, message: 'Loading local configuration' },
  { min: 3, max: 4, message: 'Checking connection settings' },
  { min: 4, max: 6, message: 'Connecting to TRON network' },
  { min: 6, max: 8, message: 'Syncing with active nodes' },
  { min: 8, max: 10, message: 'Establishing reliable connections' },
  { min: 10, max: 15, message: 'Synchronizing local chain with TRON network' },
  { min: 15, max: 20, message: 'Getting latest block height' },
  { min: 20, max: 25, message: 'Preparing recent block index' },
  { min: 25, max: 29, message: 'Fetching recent blocks from network' },
  { min: 29, max: 33, message: 'Receiving blockchain data packets' },
  { min: 33, max: 37, message: 'Updating local block storage' },
  { min: 37, max: 41, message: 'Verifying transaction structure' },
  { min: 41, max: 46, message: 'Checking block hashes and links' },
  { min: 46, max: 50, message: 'Ensuring data consistency' },
  { min: 50, max: 58, message: 'Loading solid blocks from checkpoints' },
  { min: 58, max: 67, message: 'Applying verified chain segments' },
  { min: 67, max: 75, message: 'Refreshing local blockchain state' },
  { min: 75, max: 80, message: 'Confirming consensus state' },
  { min: 80, max: 85, message: 'Checking TRON network signatures' },
  { min: 85, max: 90, message: 'Verifying solid block references' },
  { min: 90, max: 93, message: 'Applying final updates' },
  { min: 93, max: 97, message: 'Preparing wallet for use' },
  { min: 97, max: 100, message: 'Synchronization complete' }
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f0eb]">
      <SpaceBackground />
      <FloatingElements />
      <div className="z-10 flex flex-col items-center justify-between h-full py-16">
        <Content />
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Content() {
  const [progress, setProgress] = useState(0)
  const [currentHeader, setCurrentHeader] = useState(loadingHeaders[0].message)
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0].message)

  useEffect(() => {
    const totalIterations = 100
    let i = 0
    const increment = 100 / totalIterations

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const runStep = () => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100)

        const message = loadingMessages.find(
          (msg) => newProgress >= msg.min && newProgress < msg.max
        )
        const header = loadingHeaders.find(
          (msg) => newProgress >= msg.min && newProgress < msg.max
        )

        if (message && header) {
          setCurrentMessage(message.message)
          setCurrentHeader(header.message)
        }

        return newProgress
      })

      i++

      if (i < totalIterations) {
        const nextDelay = i < 30 ? i ** 2 * 500 : i ** 2 * 1300
        setTimeout(runStep, nextDelay)
      }
    }

    runStep()

    return () => {
      // cleanup — скасування всіх запланованих timeout-ів
      let id = window.setTimeout(() => {}, 0)
      while (id--) clearTimeout(id)
    }
  }, [])


  return (
    <>
      <div className="text-transparent">.</div>

      <div className="w-[600px] relative z-10 flex flex-col items-center justify-center h-full gap-8 px-8">
        <TronLogo progress={progress} />

        <div className="text-center">
          <h2 className="text-3xl text-red-500 font-bold text-red-400 mb-2 animate-fade-in">
            {currentHeader}
          </h2>
          <p className="text-md text-stone-500 font-mono">{currentMessage}</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-2xl">
          {/* Progress Bar Background */}
          <div className="relative h-3 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border border-white/30">
            {/* Animated Progress Fill */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff5c4d] via-[#ff7a6d] to-[#ff5c4d] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            {/* Glow Effect */}
            <div
              className="absolute top-0 left-0 h-full bg-[#ff5c4d] rounded-full blur-xl opacity-50 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage Indicator */}
          <div className="relative mt-4">
            <div
              className="absolute -top-2 transition-all duration-300 ease-out"
              style={{ left: `calc(${progress}% - 20px)` }}
            >
              <div className="bg-[#ff5c4d] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg text-red-400 tracking-wider">Syncing with blockchain network</p>
      </div>
      <p className="text-md text-stone-400 uppercase tracking-wider">
        Secure • Decentralized • Transparent
      </p>
    </>
  )
}
