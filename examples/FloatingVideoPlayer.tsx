'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface FloatingVideoPlayerProps {
  autoOpen?: boolean
}

export function FloatingVideoPlayer({ autoOpen = false }: FloatingVideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
    }
  }, [autoOpen])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Floating Trigger Button */}
      <div className="group fixed top-20 right-4 z-[60] flex flex-col items-end sm:top-24 sm:right-6 lg:top-28 lg:right-12 xl:right-16">
        <div className="mb-3 hidden transition-opacity duration-300 sm:block">
          <span className="text-muted-foreground bg-background/80 rounded-lg border px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm group-hover:opacity-0">
            See how it works
          </span>
          <span className="bg-brand-primary/90 absolute top-0 right-0 rounded-lg px-3 py-1.5 text-sm text-white opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Click to watch demo
          </span>
        </div>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <div className="border-brand-primary h-20 w-32 overflow-hidden rounded-lg border-3 bg-black shadow-lg transition-all duration-300 group-hover:scale-105 hover:border-[#2bc780] hover:shadow-xl sm:h-24 sm:w-40 lg:h-28 lg:w-48">
              <Image
                src="/elliotdemo.png"
                alt="Demo video thumbnail"
                width={192}
                height={112}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/5">
                <div className="bg-brand-primary/80 rounded-full p-2.5 shadow-lg backdrop-blur-sm">
                  <Play className="ml-0.5 h-5 w-5 text-white" fill="white" />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* Video Modal */}
      <DialogContent className="w-full max-w-4xl border-0 bg-black p-0" showCloseButton={false}>
        <div className="relative">
          {/* Custom close button */}
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-black/50 p-0 backdrop-blur-sm hover:bg-black/70"
            variant="ghost"
          >
            <X className="h-4 w-4 text-white" />
          </Button>

          {/* Video Container */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              preload="metadata"
              poster="/video-poster.jpg"
              onLoadedData={handleLoadedData}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
              autoPlay
            >
              <source src="/video/landingpagedemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="border-brand-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
              </div>
            )}

            {/* Custom Play Button Overlay */}
            {!isPlaying && isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="h-16 w-16 rounded-full bg-white/20 p-0 backdrop-blur-sm hover:bg-white/30"
                >
                  <Play className="ml-1 h-6 w-6 text-white" fill="white" />
                </Button>
              </div>
            )}
          </div>

          {/* Video Title */}
          <div className="p-6 text-center">
            <h3 className="mb-2 text-xl font-semibold text-white">See How It Works</h3>
            <p className="text-sm text-gray-300">
              Watch how easy it is to create powerful automations with AI in just minutes
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
