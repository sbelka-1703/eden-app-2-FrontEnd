import iro from "@jaames/iro";
import {
  createRef,
  FunctionComponent,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from "react";

interface IroColorPicker {
  // eslint-disable-next-line no-unused-vars
  on: (action: string, callback: Function) => void;
  // eslint-disable-next-line no-unused-vars
  off: (action: string, callback: Function) => void;
  color: {
    rgbString: string;
    // eslint-disable-next-line no-unused-vars
    set: (value: any) => void;
    // eslint-disable-next-line no-unused-vars
    setState: (state: any) => void;
  };
}

export interface ColorInputProps {
  className?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: string) => void;
}

export const ColorPicker: FunctionComponent<ColorInputProps> = ({
  value = "rgb(255, 0, 0)",
  onChange = () => null,
}) => {
  const colorPicker: MutableRefObject<IroColorPicker | null> =
    useRef<IroColorPicker | null>(null);
  const el: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!colorPicker.current) {
      // create a new iro color picker and pass component props to it
      colorPicker.current = new (iro.ColorPicker as any)(el.current, {
        color: value,
        layout: [
          {
            component: iro.ui.Wheel,
          },
        ],
      });
      // call onColorChange prop whenever the color changes
      if (!colorPicker.current) {
        return;
      }
      colorPicker.current.on("color:change", (color: { rgbString: string }) => {
        onChange(color.rgbString);
      });
    } else if (value !== colorPicker.current.color.rgbString) {
      colorPicker.current.color.set(value);
    }

    return () => {
      if (colorPicker.current) {
        colorPicker.current.off(
          "color:change",
          (color: { rgbString: string }) => {
            onChange(color.rgbString);
          }
        );
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={el} />;
};
