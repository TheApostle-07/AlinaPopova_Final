'use client';

import { useEffect, useMemo, useState } from 'react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
};

export const TypingText = ({ words, typingSpeed = 85, deletingSpeed = 45, pauseMs = 1500, className = '' }: TypingTextProps) => {
  const reducedMotion = useReducedMotion();
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(safeWords[0] ?? 'Modern Brands');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const firstWord = safeWords[0] ?? 'Modern Brands';
    if (reducedMotion || safeWords.length <= 1) {
      setText(firstWord);
      return;
    }

    const activeWord = safeWords[wordIndex] ?? firstWord;
    const delay = paused ? pauseMs : deleting ? deletingSpeed : typingSpeed;
    const timeout = window.setTimeout(() => {
      if (paused) {
        setPaused(false);
        setDeleting(true);
        return;
      }

      if (deleting) {
        const nextText = activeWord.slice(0, Math.max(0, text.length - 1));
        setText(nextText);
        if (!nextText) {
          setDeleting(false);
          setWordIndex((current) => (current + 1) % safeWords.length);
        }
        return;
      }

      const nextText = activeWord.slice(0, text.length + 1);
      setText(nextText);
      if (nextText === activeWord) setPaused(true);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, pauseMs, paused, reducedMotion, safeWords, text, typingSpeed, deletingSpeed, wordIndex]);

  return (
    <span className={`inline-block min-w-0 text-left align-baseline text-primary sm:min-w-[16ch] ${className}`}>
      <span className="inline-flex items-baseline whitespace-nowrap">
        <span>{text}</span>
        {!reducedMotion && <span aria-hidden="true" className="ml-1 inline-block h-[0.82em] w-[2px] translate-y-[0.08em] rounded-full bg-primary/70 animate-[typingCursor_1.15s_ease-in-out_infinite]" />}
      </span>
    </span>
  );
};
