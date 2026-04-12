import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import OnboardingProgress from '@/components/onboarding/OnboardingProgress'
import WelcomeStep from '@/components/onboarding/WelcomeStep'
import LocationStep from '@/components/onboarding/LocationStep'
import NotificationTimeStep from '@/components/onboarding/NotificationTimeStep'
import NotificationPermissionStep from '@/components/onboarding/NotificationPermissionStep'
import DoneStep from '@/components/onboarding/DoneStep'

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))

  return (
    <div className="flex min-h-screen flex-col bg-teal-50 dark:bg-gray-900">
      <div className="pt-12 pb-8">
        <OnboardingProgress currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>
      <div className="flex flex-1 items-center justify-center px-6 pb-12">
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            {step === 0 && (
              <WelcomeStep name={name} onNameChange={setName} onContinue={next} />
            )}
            {step === 1 && <LocationStep onAllow={next} onSkip={next} />}
            {step === 2 && <NotificationTimeStep onContinue={next} />}
            {step === 3 && (
              <NotificationPermissionStep onEnable={next} onSkip={next} />
            )}
            {step === 4 && <DoneStep name={name} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
