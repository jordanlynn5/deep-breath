import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckinLayout from '@/components/checkin/CheckinLayout'
import AirQualityStep from '@/components/checkin/AirQualityStep'
import VitalsStep from '@/components/checkin/VitalsStep'
import BranchStep from '@/components/checkin/BranchStep'
import SymptomPickerStep from '@/components/checkin/SymptomPickerStep'
import ReflectionStep from '@/components/checkin/ReflectionStep'
import InsightStep from '@/components/checkin/InsightStep'

const TOTAL_STEPS = 6

export default function CheckinPage() {
  const [step, setStep] = useState(0)
  const [hasSymptoms, setHasSymptoms] = useState(false)

  const goTo = (next: number) => setStep(Math.max(0, Math.min(next, TOTAL_STEPS - 1)))
  const next = () => goTo(step + 1)
  const back = () => goTo(step - 1)

  // Step 1 (AirQuality) and 5 (Insight) are fullscreen — no CheckinLayout chrome.
  if (step === 0) {
    return (
      <AnimatePresence initial={false}>
        <motion.div
          key="aqi"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AirQualityStep onStart={next} />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <CheckinLayout
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          onBack={back}
          onNext={step === 1 ? undefined : undefined}
        >
          {step === 1 && <VitalsStep onComplete={next} />}
          {step === 2 && (
            <BranchStep
              onAnswer={(answer) => {
                setHasSymptoms(answer)
                goTo(answer ? 3 : 4)
              }}
            />
          )}
          {step === 3 && hasSymptoms && <SymptomPickerStep onContinue={next} />}
          {step === 4 && <ReflectionStep onSubmit={next} onSkip={next} />}
          {step === 5 && <InsightStep onDone={() => goTo(0)} />}
        </CheckinLayout>
      </motion.div>
    </AnimatePresence>
  )
}
