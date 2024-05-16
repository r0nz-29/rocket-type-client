import {faker} from "@faker-js/faker";
import {WORD_COUNT} from "../store";

export function getParagraph() {
  return faker.word.words({count: WORD_COUNT}); // 'almost'
}

// export function getArrayFromMap(map) {
//   const board = [];
//   Object.keys(map).forEach(key => {
//     const user = {};
//     user.username = key;
//     user.speed = map[key]?.speed;
//     user.pos = map[key]?.pos;
//     user.over = map[key]?.over;
//     user.accuracy = map[key]?.accuracy;
//     user.errors = map[key]?.errors;
//     board.push(user);
//   })
//   return board;
// }

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
  if (res >= max) return max-1;
  else return res;
}

export const gradient = "bg-gradient-to-tl from-nord9 via-nord7 to-nord14";