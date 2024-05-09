import {create} from "zustand";
import {getParagraph} from "../utils";

export const WORD_COUNT = 30;
export const MULTIPLAYER_GAME_DURATION = 50;
export const DURATIONS = [25, 50, 75];
export const BACKSPACE = "Backspace";
export const DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard"
};

export const SPECIAL_KEYS = new Set([
  "Tab",
  "CapsLock",
  "Shift",
  "Control",
  "Alt",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Enter",
  "Meta",
  "NumLock"
]);

export const GAME_STATES = {
  TYPING: "typing",
  IDLE: "idle",
  COMPLETED: "completed"
};

export const GAME_MODES = {
  SOLO: "solo",
  MULTIPLAYER: "multiplayer"
};

export type AccountT = {
  username: string;
  email: string;
}

export type PointT = {
  x: number;
  y: number;
};

export type ResultT = {
  wpm: number,
  accuracy: number,
  mode: string,
  errors: number,
  duration: number,
};

type State = {
  soloParagraph: string;
  lobbyParagraph: string;
  activeDuration: number;
  soloDifficulty: string,
  typedParagraph: string,
  cursorPosition: number,
  errors: number,
  findingRoom: boolean,
  roomName: string,
  // roomMembers: {},
  waitingTimeout: number,
  wpmGraph: PointT[],
  errorPoints: PointT[],
  gameState: string,
  // board: [],
  account: AccountT,
  accessToken: null | string
}

type Actions = {
  setAccount: (account: AccountT) => void,
  setAccessToken: (token: string | null) => void,
  setRoomName: (name: string) => void,
  // setBoard: board => set(() => ({board})),
  setLobbyPara: (para: string) => void,
  setSoloPara: (para: string) => void,
  setSoloDifficulty: (diff: string) => void,
  setActiveDuration: (dur: number) => void,
  setWaitingTimeout: (time: number) => void,
  // setRoomMembers: members => set(() => ({roomMembers: members})),
  incrementCursor: () => void;
  incrementErrors: () => void;
  updateGameState: (state: string) => void;
  updateTypedParagraph: (char: string) => void;
  updateWpmGraph: (point: PointT) => void;
}

export const useStore = create<State & Actions>((set) => ({
  soloParagraph: getParagraph(),
  lobbyParagraph: "",
  activeDuration: DURATIONS[0],
  soloDifficulty: DIFFICULTIES.EASY,
  typedParagraph: "",
  cursorPosition: 0,
  errors: 0,
  findingRoom: false,
  roomName: "",
  roomMembers: {},
  waitingTimeout: -1,
  wpmGraph: [],
  errorPoints: [],
  gameState: GAME_STATES.IDLE,
  account: {email: "", username: ""},
  accessToken: null,
  setAccount: (account) => set(() => ({account})),
  setAccessToken: (token) => set(() => ({accessToken: token})),
  setRoomName: name => set(() => ({roomName: name})),
  setLobbyPara: para => set(() => ({lobbyParagraph: para})),
  setSoloPara: para => set(() => ({soloParagraph: para})),
  setSoloDifficulty: diff => set(() => ({soloDifficulty: diff})),
  setActiveDuration: dur => set(() => ({activeDuration: dur})),
  setWaitingTimeout: time => set(() => ({waitingTimeout: time})),
  incrementCursor: () => set(state => ({cursorPosition: state.cursorPosition + 1})),
  incrementErrors: () => set(state => ({errors: state.errors + 1})),
  updateGameState: (state) => set(() => ({gameState: state})),
  updateWpmGraph: (p) => set((state) => ({wpmGraph: [...state.wpmGraph, p]})),
  updateTypedParagraph: (char: string) => set((state) => ({typedParagraph: state.typedParagraph + char})),
}));