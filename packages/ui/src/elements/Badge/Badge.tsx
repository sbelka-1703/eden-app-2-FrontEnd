import { XIcon } from "@heroicons/react/outline";

export interface BadgeProps {
  colorRGB?: string;
  text: string;
  className?: string;
  closeButton?: boolean;
  onClose?: () => void;
}
export const Badge = ({
  colorRGB,
  text,
  className = "",
  closeButton = false,
  onClose,
}: BadgeProps) => {
  if (!text) return null;

  const textShort = text?.length > 10 ? text.substring(0, 8) + "..." : text;

  return (
    <div
      className={`mr-2 mb-1 inline-block rounded-full ${className}`}
      style={{ background: `rgba(${colorRGB})` }}
    >
      <div className="flex h-full w-full items-center justify-between px-3">
        <>
          <span className="mb-px">{textShort}</span>
          {closeButton && (
            <button className={`ml-2 -mt-1`} onClick={onClose}>
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
