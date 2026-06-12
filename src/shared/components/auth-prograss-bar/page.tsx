// components/Stepper.tsx

interface StepperProps {
  totalSteps: number
  currentStep: number // 0-based index
}

export default function Stepper({ totalSteps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full px-4 py-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">

          {/* Diamond */}
          <div className="relative flex items-center justify-center">

            {/* Glow ring for active */}
            {i === currentStep && (
              <span className="absolute w-5.5 h-5.5 bg-blue-100 rotate-45" />
            )}

            <span className={`
              relative rotate-45
              ${i < currentStep
                ? "w-2.5 h-2.5 bg-blue-600"
                : i === currentStep
                ? "w-2.5 h-2.5 bg-blue-600"
                : "w-2.5 h-2.5 border-[1.5px] border-blue-400 bg-white"}
            `} />
          </div>

          {/* Connector line */}
          {i < totalSteps - 1 && (
            <div className={`
              flex-1 h-px mx-1
              ${i < currentStep
                ? "bg-blue-600"
                : "border-t border-dashed border-blue-300 bg-transparent"}
            `} />
          )}

        </div>
      ))}
    </div>
  )
}