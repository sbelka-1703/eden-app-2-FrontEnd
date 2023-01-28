import {
  TextBody,
  TextHeading1,
  TextHeading2,
  TextHeading3,
  TextInputLabel,
  TextLabel1,
  TextLabel2,
} from "../atoms/text";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Design System/Typography",
};

export const Typography = () => {
  return (
    <div className={`space-y-6`}>
      <div className={``}>
        <div>
          {`<TextHeading1 />  -{fontFamily: Poppins, fontSize: 32px, fontWeight: 500, letterSpacing: 0.02em, color: #000000}`}
        </div>

        <TextHeading1>The brown fox jumped over the lazy dog.</TextHeading1>
      </div>
      <div className={``}>
        <div>
          {`<TextHeading2 />  - {fontFamily: Poppins, fontSize: 26px, fontWeight: 500, letterSpacing: 0.02em, color: #000000}`}
        </div>
        <TextHeading2>The brown fox jumped over the lazy dog.</TextHeading2>
      </div>
      <div className={``}>
        <div>
          {`<TextHeading3 />  - {fontFamily: Poppins, fontSize: 20px, fontWeight: 500, letterSpacing: 0.02em, color: #000000}`}
        </div>
        <TextHeading3>The brown fox jumped over the lazy dog.</TextHeading3>
      </div>
      <div className={``}>
        <div>
          {`<TextBody />  - {fontFamily: Poppins, fontSize: 16px, fontWeight: 400, letterSpacing: 0em, color: #000000}`}
        </div>
        <TextBody>The brown fox jumped over the lazy dog.</TextBody>
      </div>
      <div className={``}>
        <div>
          {`<TextLabel1 />  - {fontFamily: Inter, fontSize: 15px, fontWeight: 600, letterSpacing: 0.04em, color: #AAAAAA}`}
        </div>
        <TextLabel1>The brown fox jumped over the lazy dog.</TextLabel1>
      </div>
      <div className={``}>
        <div>
          {`<TextLabel2 />  - {fontFamily: Inter, fontSize: 12px, fontWeight: 600, letterSpacing: 0.04em, color: #AAAAAA}`}
        </div>
        <TextLabel2>The brown fox jumped over the lazy dog.</TextLabel2>
      </div>
      <div className={``}>
        <div>
          {`<TextInputLabel />  - {fontFamily: Poppins, fontSize: 14px, fontWeight: 500, letterSpacing: 0.02em, color: #374151}`}
        </div>
        <TextInputLabel>The brown fox jumped over the lazy dog.</TextInputLabel>
      </div>
    </div>
  );
};
