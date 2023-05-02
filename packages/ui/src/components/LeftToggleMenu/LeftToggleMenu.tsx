/* eslint-disable no-unused-vars */
import {
  LevelEnum,
  Maybe,
  // eslint-disable-next-line camelcase
} from "@eden/package-graphql/generated";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

import { Button } from "../../elements";

export interface LeftToggleMenuProps {}

export const LeftToggleMenu = ({}: LeftToggleMenuProps) => {
  const [] = useState(false);

  return (
    <div className="absolute left-0 top-16 h-[calc(100%-4rem)] -translate-x-32">
      <div className="h-full w-32 bg-red-500">
        <h3>Dashboard</h3>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className="h-4 w-4">{">"}</div>
    </div>
  );
};
