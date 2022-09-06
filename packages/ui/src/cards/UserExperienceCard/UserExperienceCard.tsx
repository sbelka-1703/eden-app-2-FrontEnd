import {  Card } from "../../elements";
import { useState } from "react";
export interface UserExperienceCardlProps {
  avatar?: string;
  title?: string;
  description?: string;
  onUpdateFavorite?: () => void;
  onMoreInfoClick?: () => void;
}

export const UserExperienceCard = ({
  onUpdateFavorite,
}: UserExperienceCardlProps) => {
  const [fav, updateFav] = useState(false);
  return (
    <Card shadow className="p-0">
      Looks like I got storybook to work
    </Card>
  );
};