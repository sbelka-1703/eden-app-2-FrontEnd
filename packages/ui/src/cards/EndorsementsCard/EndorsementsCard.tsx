import React from 'react'
import { AvatarList } from '../../components/AvatarList';
import { AvatarProps, Card } from '../../elements';

type EndorsedSkill = {
    name: string;
    endorsedBy: AvatarProps[];
}
export interface EndorsementsProps {
    endorsements: EndorsedSkill[];
    shadow?: boolean
}

export const EndorsementsCard: React.FC<EndorsementsProps> = ({ endorsements, shadow = true }) => {
    return (
        <Card shadow={shadow}>
        <div className="flex flex-col justify-start items-center">
            <h1 className="text-xl text-black font-bold uppercase">endorsed for</h1>
            <div className="flex flex-wrap">
                {endorsements?.map((endorsement: EndorsedSkill) => (
                    <div className="flex flex-col justify-start items-center m-4">
                        <h3 className="text-lg text-black uppercase">
                            {endorsement?.name}
                        </h3>
                        <AvatarList avatars={endorsement?.endorsedBy} />
                    </div>
                ))}
            </div>
        </div>
        </Card>
    )
}
