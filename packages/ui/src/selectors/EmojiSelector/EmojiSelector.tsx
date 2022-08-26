import { useState } from "react";
import dynamic from "next/dynamic";
export interface IEmojiSelectorProps {}

export const EmojiSelector = ({ }: IEmojiSelectorProps) => {
  const [emojiSelect, setEmojiSelect] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("@")
  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const onEmojiClick = (event: any, emojiObject: any) => {
    setEmojiSelect(!emojiSelect);
    console.log(emojiObject.emoji);
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiSelector(false);
  };

  const onShowEmojiSelector = () => {
    setShowEmojiSelector(true)
  };

  return (
    <div className="flex flex-row">
      <div>
        <div className="bg-emerald-500 rounded-full p-7 text-5xl cursor-pointer" onClick={()=>onShowEmojiSelector()}>
          {selectedEmoji ? selectedEmoji : " ? "}
        </div>
      </div>
      <div>
        {showEmojiSelector ? (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ marginTop: "0px", left: "40px" }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
