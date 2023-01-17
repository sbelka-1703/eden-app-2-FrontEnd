import { UserContext } from "@eden/package-context";
import {
  PreferencesType,
  PreferencesTypeFind,
} from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Modal,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { CheckIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";

export interface PreferencesModalProps {
  openModal?: boolean;
  onClose: () => void;
  battery?: boolean;
  numMatches?: number | string;
  batteryPercentage?: number;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (preferences: PreferencesType) => void;
}

export interface IPREFERENCES_TITLE {
  findCoFounder: string;
  findMentee: string;
  findMentor: string;
  findUser: string;
  findProject: string;
}

export const PREFERENCES_TITLE: IPREFERENCES_TITLE = {
  findCoFounder: "Find Co-Founder",
  findMentee: "Find Mentee",
  findMentor: "Find Mentor",
  findUser: "Find DAO Members",
  findProject: "Find Project",
};

export const PreferencesModal = ({
  onClose,
  battery = false,
  batteryPercentage = 75,
  openModal,
  onSubmit,
  numMatches,
}: PreferencesModalProps) => {
  const { currentUser } = useContext(UserContext);

  const [preferences, setPreferences] = useState<PreferencesType>({
    findCoFounder: {
      interestedMatch:
        currentUser?.preferences?.findCoFounder?.interestedMatch || null,
    } as PreferencesTypeFind,
    findMentee: {
      interestedMatch:
        currentUser?.preferences?.findMentee?.interestedMatch || null,
    } as PreferencesTypeFind,
    findMentor: {
      interestedMatch:
        currentUser?.preferences?.findMentor?.interestedMatch || null,
    } as PreferencesTypeFind,
    findProject: {
      interestedMatch:
        currentUser?.preferences?.findProject?.interestedMatch || null,
    } as PreferencesTypeFind,
    findUser: {
      interestedMatch:
        currentUser?.preferences?.findUser?.interestedMatch || null,
    } as PreferencesTypeFind,
  });

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <div className="flex justify-between">
          <div className="flex-1">
            <TextHeading3>Let me get your priorities straight.</TextHeading3>
            <TextBody className={`font-medium text-gray-500`}>
              On a scale from 0 to 100, how would you rate the importance to
              each attribute
            </TextBody>
          </div>

          {battery && (
            <BatteryStepper
              batteryPercentage={batteryPercentage}
              numMatches={numMatches}
            />
          )}
        </div>

        <section className="mb-4">
          <div className="flex w-full flex-wrap">
            {Object.keys(preferences).map((key: string, index) => (
              <div key={index} className="relative mr-4 mb-4">
                <input
                  type="checkbox"
                  checked={
                    (
                      preferences[
                        key as keyof PreferencesType
                      ] as PreferencesTypeFind
                    )?.interestedMatch || false
                  }
                  id={key}
                  className="peer hidden"
                  onChange={(e) => {
                    console.log(e.target.checked);

                    setPreferences({
                      ...preferences,
                      [key]: {
                        interestedMatch: e.target.checked || null,
                      },
                    });
                  }}
                />
                <label
                  htmlFor={key}
                  className="peer-checked:text-accentColor peer-checked:border-accentColor border-soilGray block select-none rounded-full border px-4 py-2 peer-checked:border-2 peer-checked:pr-10 peer-checked:font-bold"
                >
                  {PREFERENCES_TITLE[key as keyof IPREFERENCES_TITLE]}
                </label>
                <label
                  htmlFor={key}
                  className="absolute top-2 right-2 hidden peer-checked:block"
                >
                  <CheckIcon className="text-accentColor" width={30} />
                </label>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-between">
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Skip
          </Button>
          <Button
            radius="rounded"
            variant={`secondary`}
            onClick={() => onSubmit(preferences)}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
