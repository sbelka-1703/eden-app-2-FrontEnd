import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button, Card } from "ui";

export interface LaunchPageProps {}

export const LaunchContainer = ({}: LaunchPageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxSteps = 5;

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`relative h-full`}>
        launch step: {currentIndex}
        <div className={`absolute bottom-2 flex w-full justify-between`}>
          <div>
            {currentIndex !== 0 && (
              <Button onClick={() => setCurrentIndex(currentIndex - 1)}>
                <span className={`my-auto pr-2`}>
                  <BsArrowLeft />
                </span>
                PREVIOUS
              </Button>
            )}
          </div>
          <div>
            {currentIndex < maxSteps ? (
              <Button
                variant={`primary`}
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                NEXT
                <span className={`my-auto pl-2`}>
                  <BsArrowRight />
                </span>
              </Button>
            ) : (
              <Button variant={`primary`} onClick={() => console.log("done")}>
                FINISH
                <span className={`my-auto pl-2`}>
                  <BsArrowRight />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
