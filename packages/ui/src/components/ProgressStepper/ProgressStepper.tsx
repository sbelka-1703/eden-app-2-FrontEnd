import React from 'react'

type ProgressStep = {
    name: string;
    completed: boolean;
}
export interface ProgressStepperProps {
    steps: ProgressStep[]
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps }) => {
    return (
        <div className="w-full flex">
            {steps?.map((step: ProgressStep) => (
                <div className="flex flex-col justify-start items-start mx-1 w-60">
                    <h3 className="text-xs text-black font-bold uppercase">{step?.name}</h3>
                    <div className={`w-full ${step?.completed ? 'bg-soilGreen-900' : 'bg-gray-400'} h-2 rounded-md`} />
                </div>
            ))}
        </div>
    )
}