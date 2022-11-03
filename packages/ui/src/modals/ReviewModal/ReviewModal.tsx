import {
  Badge,
  BadgeProps,
  Button,
  Modal,
  TextHeading3,
} from "@eden/package-ui";

export type DataReviewModal = {
  main: {
    _id: string;
    name: string;
  }[];
  second: {
    _id: string;
    name: string;
  }[];
  third: {
    _id: string;
    name: string;
  }[];
  [key: string]: {
    _id: string;
    name: string;
  }[];
};

export interface ReviewModalProps {
  data: DataReviewModal;
  openModal?: boolean;
  onClose: () => void;
  // onSubmit: () => void;
}

const bottomLineGenerator = (isLast: boolean) => {
  if (!isLast)
    return `
  before:absolute
  before:-bottom-5
  before:left-2/4
  before:-z-10
  before:h-8
  before:w-0.5
  before:-translate-x-2/4
  before:bg-gray-200`;

  return "";
};

interface CustomBadgeProps extends BadgeProps {
  isLast: boolean;
}

const CustomBadge = ({ isLast, text }: CustomBadgeProps) => (
  <div className="mb-4">
    <Badge
      text={text}
      cutText={15}
      className={`relative 
      bg-yellow-300 ${bottomLineGenerator(isLast)}`}
    />
  </div>
);

export const ReviewModal = ({
  data,
  onClose,
  openModal,
}: // onSubmit,
ReviewModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <TextHeading3>Let’s review & finalise it!</TextHeading3>
        <section className={`my-4 grid items-center gap-2 lg:grid-cols-4`}>
          <div className="flex w-fit flex-col text-center">
            {data?.main?.map((item, index) => (
              <CustomBadge
                key={item._id}
                text={item.name}
                isLast={data.main.length - 1 === index}
              />
            ))}
          </div>
          <div className="flex w-fit flex-col text-center">
            {data?.second?.map((item, index) => (
              <CustomBadge
                key={item._id}
                text={item.name}
                isLast={data.second.length - 1 === index}
              />
            ))}
          </div>
          <div className="col-span-2 flex w-full flex-col text-center">
            {data.third.map((item) => (
              <div className="flex items-center justify-between" key={item._id}>
                <CustomBadge text={item.name} isLast />
                <div className="flex w-fit flex-col text-center">
                  {data[item.name]?.map((skill, index) => (
                    <CustomBadge
                      key={skill._id}
                      text={skill.name}
                      isLast={data[item.name].length - 1 === index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-between">
          <div>
            <Button radius="rounded" variant={`secondary`} onClick={onClose}>
              Skip
            </Button>
          </div>
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
