'use client'

import { motion } from 'framer-motion'
import { PenSquare, BrainCircuit, FileJson, ChevronRight } from 'lucide-react'

const steps = [
  {
    icon: <PenSquare className="h-6 w-6" />,
    text: 'Describe Workflow',
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    text: 'AI Analyzes',
  },
  {
    icon: <FileJson className="h-6 w-6" />,
    text: 'Get JSON & Guide',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
}

export function ProcessSteps() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-muted-foreground relative flex flex-col items-start justify-center gap-8 text-sm sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="border-border absolute top-0 left-5 h-full w-px -translate-x-px border-l border-dashed sm:hidden" />
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative z-10 flex w-full items-center justify-start gap-6 sm:w-auto sm:justify-center"
          variants={itemVariants}
        >
          <div className="relative flex items-center gap-3 pl-14 sm:pl-0">
            <div className="bg-background text-primary absolute left-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border shadow-sm sm:static">
              {step.icon}
            </div>
            <span className="text-left">{step.text}</span>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="text-primary hidden h-6 w-6 sm:block" />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
