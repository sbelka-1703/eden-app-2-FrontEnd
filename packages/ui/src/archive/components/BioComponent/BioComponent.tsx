import { Card } from "@eden/package-ui";
import { FiEdit3 } from "react-icons/fi";
export interface IBioComponentProps {
  title?: string;
  description?: string;
  onEdit?: () => void;
  isEditable?: boolean;
}

export const BioComponent = ({
  title,
  description,
  onEdit,
  isEditable,
}: IBioComponentProps) => {
  return (
    <Card shadow>
      <div className="flex flex-col text-sm">
        <div
          className={`flex flex-row content-center justify-between justify-items-stretch`}
        >
          <div>
            <div className={`font-semibold`}>{title}</div>
          </div>
          <div className="mt-1">
            {isEditable ? (
              <button className={`w-full text-zinc-400`} onClick={onEdit}>
                <FiEdit3 size="20px" />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={`my-2 text-slate-700`}>
          <p className="break-words text-justify">{description}</p>
        </div>
      </div>
    </Card>
  );
};
