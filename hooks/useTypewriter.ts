"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
  words: string[],
  typingSpeed: number = 150,
  erasingSpeed: number = 75,
  delayBetweenWords: number = 1000
) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting;

    if (shouldDelete && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    if (!shouldDelete && displayText === currentWord) {
      setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
      return;
    }

    const nextText = shouldDelete
      ? currentWord.substring(0, displayText.length - 1)
      : currentWord.substring(0, displayText.length + 1);

    setDisplayText(nextText);
  }, [displayText, wordIndex, isDeleting, words, delayBetweenWords]);

  useEffect(() => {
    const timeout = setTimeout(
      animate,
      isDeleting ? erasingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [animate, isDeleting, erasingSpeed, typingSpeed]);

  return displayText;
}
