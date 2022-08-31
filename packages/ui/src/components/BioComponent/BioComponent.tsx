import { FiEdit3 } from "react-icons/fi";
import { Card } from "ui";
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
      <div className="flex flex-col">
        <div
          className={`flex flex-row content-center justify-between justify-items-stretch`}
        >
          <div>
            <div className={`text-sm font-semibold`}>{title}</div>
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
        <div className={`mx-6 my-2 text-lg text-slate-700`}>
          <p className="break-words text-justify">{description}</p>
        </div>
      </div>
    </Card>
  );
};
