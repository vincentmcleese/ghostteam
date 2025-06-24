'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { ProcessSteps } from './ProcessSteps'
import { useState, useEffect, useRef } from 'react'

const ANIMATION_STEPS = [
  '1. Fetch top posts from r/marketing about AI',
  '2. Get OpenAI to analyze trending topics',
  '3. Then generate 5 LinkedIn post copy variations based on trends',
  '4. Save the analysis results to Google Sheets',
  '5. Notify my team in Slack that the top is ready',
]

interface HeroSectionProps {
  prompt: string
  setPrompt: (value: string) => void
  onGenerate: () => void
  loading: boolean
  buttonText: string
  onInspireMe: () => void
}

export function HeroSection({
  prompt,
  setPrompt,
  onGenerate,
  loading,
  buttonText,
  onInspireMe,
}: HeroSectionProps) {
  const [showAnimatedPlaceholder, setShowAnimatedPlaceholder] = useState(true)
  const [animatedText, setAnimatedText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!showAnimatedPlaceholder || prompt) return

    let phase = 0 // 0: title, 1: steps, 2: analysis
    let stepIndex = 0
    let currentText = ''

    const typeText = () => {
      if (phase === 0) {
        // Add title
        currentText =
          'e.g. \'Research trending "AI marketing" topics and create LinkedIn post copy\'\n'
        setAnimatedText(currentText)
        phase = 1
        setTimeout(typeText, 800)
      } else if (phase === 1 && stepIndex < ANIMATION_STEPS.length) {
        // Add each step to the same line
        if (stepIndex === 0) {
          currentText += ANIMATION_STEPS[stepIndex]
        } else {
          currentText += '  ' + ANIMATION_STEPS[stepIndex]
        }
        setAnimatedText(currentText)
        stepIndex++
        setTimeout(typeText, 1000)
      } else if (phase === 1 && stepIndex >= ANIMATION_STEPS.length) {
        // Move to analysis phase
        currentText += '\n\nAnalysis focuses on: Post titles, upvotes, comments, trending keywords'
        setAnimatedText(currentText)
        phase = 2
      }
    }

    const timer = setTimeout(typeText, 1000) // Initial delay
    return () => clearTimeout(timer)
  }, [showAnimatedPlaceholder, prompt])

  const handleFocus = () => {
    setShowAnimatedPlaceholder(false)
    setAnimatedText('')
  }

  const handleClick = () => {
    setShowAnimatedPlaceholder(false)
    setAnimatedText('')
    textareaRef.current?.focus()
  }
  return (
    <div className="relative isolate py-6 sm:py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.05, type: 'spring', stiffness: 80 }}
            className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4"
          >
            <Image
              src="/speedyghost.png"
              alt="Speedy Ghost Mascot"
              width={64}
              height={64}
              className="h-12 w-12 rounded-xl bg-white drop-shadow-md sm:h-16 sm:w-16"
              priority
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <span
                className="text-foreground/80 text-lg font-normal sm:text-xl lg:text-2xl"
                style={{ letterSpacing: '0.5em' }}
              >
                launch your
              </span>
              <h1 className="text-foreground font-chunko text-3xl tracking-wider sm:text-5xl lg:text-6xl">
                <span className="from-primary bg-gradient-to-r to-teal-400 bg-clip-text text-transparent">
                  GHOST
                </span>
                TEAM
              </h1>
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mt-6 text-lg sm:text-xl lg:text-2xl"
          >
            With just a prompt, create any AI Agent or Automation in n8n
          </motion.p>
          <div className="mt-4 hidden sm:mt-12 sm:block">
            <ProcessSteps />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder=""
              rows={6}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onFocus={handleFocus}
              onClick={handleClick}
              className="border-border/80 bg-background/50 focus-visible:ring-ring focus-visible:ring-offset-background resize-none text-base shadow-inner focus-visible:ring-2 focus-visible:ring-offset-2"
            />
            {showAnimatedPlaceholder && !prompt && (
              <div
                className="text-muted-foreground pointer-events-none absolute inset-0 overflow-hidden p-3 text-left text-base whitespace-pre-wrap"
                onClick={handleClick}
              >
                {animatedText}
                <span className="animate-pulse">|</span>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onInspireMe}
              disabled={loading}
              variant="outline"
              size="lg"
              className="w-full text-base font-semibold sm:w-auto"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Inspire Me
            </Button>
            <Button
              onClick={onGenerate}
              disabled={loading}
              size="lg"
              className="w-full text-base font-semibold sm:w-auto"
            >
              <Image
                src="/ghost_white_transparent.png"
                alt="Ghost Logo"
                width={28}
                height={28}
                className="mr-2 h-7 w-7"
              />
              {loading ? 'Analyzing...' : buttonText}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
