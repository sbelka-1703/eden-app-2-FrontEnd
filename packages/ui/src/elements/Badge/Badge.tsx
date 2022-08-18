import { XIcon } from '@heroicons/react/outline'
import React, { CSSProperties } from 'react'

interface BadgeProps {
    colorRGB: CSSProperties,
    text: string,
    onClick: () => void;
}
export const Badge: React.FC<BadgeProps> = ({
    colorRGB, 
    text,
    onClick
}) => {

    return (
        <div
            className={`mr-2 mb-1 inline-block rounded-full`}
            style={{background: `rgba(${colorRGB}, 0.4)`}}
            >
            <div className="flex h-full w-full items-center justify-between px-3">
                <>
                <span className="mr-2 mb-px">{text}</span>
                <XIcon
                    className="inline-block h-4 w-4 cursor-pointer text-gray-900 hover:text-slate-400"
                    aria-hidden="true"
                    onClick={onClick}
                />
                </>
            </div>
            </div>
    )
}
