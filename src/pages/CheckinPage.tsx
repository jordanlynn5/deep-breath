import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CheckinLayout from '@/components/checkin/CheckinLayout'
import AirQualityStep from '@/components/checkin/AirQualityStep'
import VitalsStep from '@/components/checkin/VitalsStep'
import LowVitalStep from '@/components/checkin/LowVitalStep'
import BranchStep from '@/components/checkin/BranchStep'
import SymptomPickerStep from '@/components/checkin/SymptomPickerStep'
import ReflectionStep from '@/components/checkin/ReflectionStep'
import InsightStep from '@/components/checkin/InsightStep'
import { saveCheckIn } from '@/utils/storage'
import type { VitalName, AqiSnapshot } from '@/types'

// Step IDs in order
type StepId = 'aqi' | 'vitals' | 'lowVital' | 'branch' | 'symptoms' | 'reflection' | 'insight'

const ALL_STEPS: StepId[] = ['aqi', 'vitals', 'lowVital', 'branch', 'symptoms', 'reflection', 'insight']

export default function CheckinPage() {
  const [stepId, setStepId] = useState<StepId>('aqi')
  const [ratings, setRatings] = useState<Record<VitalName, number> | null>(null)
  const [hasSymptoms, setHasSymptoms] = useState(false)
  const [aqiSnapshot, setAqiSnapshot] = useState<AqiSnapshot | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [reflection, setReflection] = useState('')
  const [lowVitalTags, setLowVitalTags] = useState<string[]>([])

  const lowVitals: VitalName[] = ratings
    ? (Object.entries(ratings) as [VitalName, number][])
        .filter(([, v]) => v <= 3)
        .map(([k]) => k)
    : []

  const visibleSteps: StepId[] = ALL_STEPS.filter((id) => {
    if (id === 'lowVital') return lowVitals.length > 0
    if (id === 'symptoms') return hasSymptoms
    return true
  })

  const currentIndex = visibleSteps.indexOf(stepId)
  const totalSteps = visibleSteps.length

  const goNext = () => {
    const next = visibleSteps[currentIndex + 1]
    if (next) setStepId(next)
  }
  const goBack = () => {
    const prev = visibleSteps[currentIndex - 1]
    if (prev) setStepId(prev)
  }

  const handleGoToInsight = (reflectionText: string) => {
    if (ratings) {
      const today = new Date()
      saveCheckIn({
        id: today.toISOString(),
        date: today.toISOString().slice(0, 10),
        timestamp: today.getTime(),
        vitals: ratings,
        lowVitalTags,
        hasSymptoms,
        symptoms,
        reflection: reflectionText,
        aqi: aqiSnapshot,
      })
    }
    setStepId('insight')
  }

  if (stepId === 'aqi') {
    return (
      <AnimatePresence initial={false}>
        <motion.div
          key="aqi"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AirQualityStep
            onStart={(snapshot?: AqiSnapshot | null) => {
              setAqiSnapshot(snapshot ?? null)
              goNext()
            }}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  const stepIndex = visibleSteps.indexOf(stepId)

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={stepId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <CheckinLayout
          currentStep={stepIndex}
          totalSteps={totalSteps}
          onBack={goBack}
        >
          {stepId === 'vitals' && (
            <VitalsStep
              onComplete={(r) => {
                setRatings(r)
                goNext()
              }}
            />
          )}
          {stepId === 'lowVital' && (
            <LowVitalStep
              lowVitals={lowVitals}
              onContinue={(tags: string[]) => {
                setLowVitalTags(tags)
                goNext()
              }}
            />
          )}
          {stepId === 'branch' && (
            <BranchStep
              onAnswer={(answer) => {
                setHasSymptoms(answer)
                if (answer) {
                  setStepId('symptoms')
                } else {
                  setStepId('reflection')
                }
              }}
            />
          )}
          {stepId === 'symptoms' && (
            <SymptomPickerStep
              onContinue={(selected: string[]) => {
                setSymptoms(selected)
                goNext()
              }}
            />
          )}
          {stepId === 'reflection' && (
            <ReflectionStep
              onSubmit={(text: string) => {
                setReflection(text)
                handleGoToInsight(text)
              }}
              onSkip={() => handleGoToInsight(reflection)}
            />
          )}
          {stepId === 'insight' && (
            <InsightStep
              onDone={() => setStepId('aqi')}
              aqi={aqiSnapshot}
            />
          )}
        </CheckinLayout>
      </motion.div>
    </AnimatePresence>
  )
}
