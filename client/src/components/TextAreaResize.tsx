import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  id?: string;
};

export default function TextAreaResize({ value, onChange, placeholder, id }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    if (!textAreaRef.current) return;

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    textAreaRef.current.style.width = "auto";
    textAreaRef.current.style.width = textAreaRef.current.scrollWidth + "px";
  };

  const onTextChange = (e: any) => {
    resize();
    onChange(e);
  };

  useEffect(() => {
    resize();
  }, [textAreaRef.current]);

  return <textarea id={id} ref={textAreaRef} value={value} onChange={onTextChange} placeholder={placeholder ?? ""} />;
}
