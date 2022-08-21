import React from 'react'
import { Badge } from '../../elements/Badge/Badge'
import { Card } from '../../elements/Card/Card'

type ISkill = {
    colorRGB: string,
    text: string,
    onClick: () => void;
}
interface SkillsCardProps {
    skills?: ISkill[];
}
export const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
    return (
        <Card shadow>
            <div className="flex justify-start items-center flex-wrap">
                {skills?.map((skill: ISkill) => (
                    <div className="mb-1">
                    <Badge colorRGB={skill.colorRGB} text={skill.text} onClose={skill.onClick} />
                    </div>
                ))}
            </div>
        </Card>
    )
}
