import { XIcon } from "@heroicons/react/outline";

export interface BadgeProps {
  colorRGB: string;
  text: string;
  closeButton?: boolean;
  onClose?: () => void;
}
export const Badge = ({
  colorRGB,
  text,
  closeButton = false,
  onClose,
}: BadgeProps) => {
  return (
    <div
      className={`mr-2 mb-1 inline-block rounded-full`}
      style={{ background: `rgba(${colorRGB}, 0.4)` }}
    >
      <div className="flex h-full w-full items-center justify-between px-3">
        <>
          <span className="mr-2 mb-px">{text}</span>
          {closeButton && (
            <button className={` -mt-1`} onClick={onClose}>
              <XIcon
                className="inline-block h-4 w-4 cursor-pointer text-gray-900 hover:text-slate-400"
                aria-hidden="true"
              />
            </button>
          )}
        </>
      </div>
    </div>
  );
};
