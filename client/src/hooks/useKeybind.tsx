import { useEffect } from "react";

interface Props {
  key: string;
  callback: () => void;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  caseSensitive?: boolean;
}

export default function useKeybind({ key, callback, ctrl, shift, alt, meta, caseSensitive }: Props) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (caseSensitive && e.key !== key) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        if (ctrl && !e.ctrlKey) return;
        if (shift && !e.shiftKey) return;
        if (alt && !e.altKey) return;
        if (meta && !e.metaKey) return;

        callback();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
}
