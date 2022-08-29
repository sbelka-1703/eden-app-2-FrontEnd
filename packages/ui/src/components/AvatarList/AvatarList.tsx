import React from 'react'
import { Avatar, AvatarProps } from '../../elements'

export interface AvatarListProps {
    avatars: AvatarProps[];
}
export const AvatarList: React.FC<AvatarListProps> = ({ avatars }) => {
    return (
       <div className="flex flex-nowrap w-full">
        {avatars?.map((avatar: AvatarProps) => (
            <div className="-mx-3">
            <Avatar size={avatar?.size} src={avatar?.src} alt={avatar?.alt ?? 'avatar'} />
            </div>
        ))}
         </div>
    )
}


