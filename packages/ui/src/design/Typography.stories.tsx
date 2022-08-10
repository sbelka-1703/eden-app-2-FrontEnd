import {
  TextBody,
  TextHeading1,
  TextHeading2,
  TextHeading3,
  TextLabel,
} from "../atoms/text";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Design-System/Typography",
};

export const Typography = () => {
  return (
    <div>
      <div className={``}>
        TextHeading1
        <TextHeading1>The brown fox jumped over the lazy dog.</TextHeading1>
      </div>
      <div className={``}>
        TextHeading2
        <TextHeading2>The brown fox jumped over the lazy dog.</TextHeading2>
      </div>
      <div className={``}>
        TextHeading3
        <TextHeading3>The brown fox jumped over the lazy dog.</TextHeading3>
      </div>
      <div className={``}>
        TextBody
        <TextBody>The brown fox jumped over the lazy dog.</TextBody>
      </div>
      <div className={``}>
        TextLabel
        <TextLabel>The brown fox jumped over the lazy dog.</TextLabel>
      </div>
    </div>
  );
};
