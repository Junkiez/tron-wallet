'use client'

import { useEffect, useState } from 'react'
import { SpaceBackground } from '@/components/space-background'
import { TronLogo } from './components/tron-logo'
import { FloatingElements } from './components/floating-elements'

const loadingHeaders = [
  { min: 1, max: 4, message: 'Environment Setup' },
  { min: 4, max: 12, message: 'Node Connection' },
  { min: 12, max: 25, message: 'Network Status Check' },
  { min: 25, max: 45, message: 'Block Retrieval' },
  { min: 45, max: 65, message: 'Block Validation' },
  { min: 65, max: 90, message: 'State Update' },
  { min: 90, max: 100, message: 'Finalizing Sync' }
]

const loadingMessages = [
  { min: 1, max: 2, message: 'Preparing EOS environment' },
  { min: 2, max: 3, message: 'Loading configuration and plugins' },
  { min: 3, max: 4, message: 'Initializing local directories' },

  { min: 4, max: 6, message: 'Connecting to EOS mainnet nodes' },
  { min: 6, max: 9, message: 'Discovering active Block Producers' },
  { min: 9, max: 12, message: 'Establishing stable API channels' },

  { min: 12, max: 16, message: 'Requesting latest block height' },
  { min: 16, max: 21, message: 'Getting irreversible block reference' },
  { min: 21, max: 25, message: 'Verifying connection latency' },

  { min: 25, max: 32, message: 'Requesting recent block data from network' },
  { min: 32, max: 39, message: 'Synchronizing to latest irreversible block' },
  { min: 39, max: 45, message: 'Updating local chain records' },

  { min: 45, max: 52, message: 'Verifying block signatures from producers' },
  { min: 52, max: 59, message: 'Checking block order and consensus status' },
  { min: 59, max: 65, message: 'Ensuring data integrity and authenticity' },

  { min: 65, max: 73, message: 'Applying validated blocks to local index' },
  { min: 73, max: 81, message: 'Refreshing account and resource tables' },
  { min: 81, max: 90, message: 'Loading latest contract information' },

  { min: 90, max: 95, message: 'Applying final updates' },
  { min: 95, max: 99, message: 'Preparing wallet for use' },
  { min: 99, max: 100, message: 'Synchronization complete ✅' }
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f0eb]">
      <SpaceBackground />
      <FloatingElements />
      <div className="z-10 flex flex-col items-center justify-between h-full py-6">
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
        const header = loadingHeaders.find((msg) => newProgress >= msg.min && newProgress < msg.max)

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

      <div className="w-[600px] relative z-10 flex flex-col items-center justify-center h-full gap-6 px-8">
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
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg text-red-400 tracking-wider">Syncing with blockchain network</p>
        <p className="text-md text-stone-400 uppercase tracking-wider">
          Secure • Decentralized • Transparent
        </p>
      </div>
    </>
  )
}
