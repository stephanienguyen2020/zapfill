interface ProgressStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

export function ProgressTracker({ steps }: { steps: ProgressStep[] }) {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
          style={{
            width: `${(steps.filter(step => step.status === 'completed').length / (steps.length - 1)) * 100}%`
          }}
        />
      </div>
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step.status === 'completed' ? 'bg-blue-500 text-white' : 
                  step.status === 'current' ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-500'}`}
            >
              {step.status === 'completed' ? '✓' : index + 1}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

