import { useEffect, useState } from "react";

const useTypingEffect = (text: string = "", speed: number) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text.trim()) {
      setDisplayedText("");
      return;
    }

    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

export default useTypingEffect;
