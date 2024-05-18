import paragraphs from "../pages/solo/paragraphs.json";

export function getParagraph() {
  const p1 = paragraphs[random(paragraphs.length)];
  const p2 = paragraphs[random(paragraphs.length)];
  return `${p1}. ${p2}`;
}

export const calculateWPM = (
  typedParagraph: string,
  wrongChars: number,
  timeInSecs: number
) => {
  const minutes = timeInSecs / 60;
  const wordsTyped = typedParagraph.length / 5;
  const wrongWordsTyped = wrongChars / 5;
  const wpm = (wordsTyped - wrongWordsTyped) / minutes;
  return wpm > 0 ? wpm : 0;
};

export function random(max: number) {
  const res = Math.floor(Math.random() * max);
  return Math.min(res, max - 1);
}

export const gradient = "bg-gradient-to-tl from-nord9 via-nord7 to-nord14";