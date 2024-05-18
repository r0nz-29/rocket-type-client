import {create} from "zustand";
import {getParagraph} from "../utils";

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
  COMPLETED: "completed",
  MULTIPLAYER: {
    WAITING: "MULTIPLAYER_WAITING",
    COUNTDOWN: "MULTIPLAYER_COUNTDOWN",
    TYPING: "MULTIPLAYER_TYPING",
    COMPLETED: "MULTIPLAYER_COMPLETED",
    RESULTS: "MULTIPLAYER_RESULTS",
  }
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

export type MultiplayerResultGraphT = {
  username: string,
  wpm: number,
  errors: number
}[];

type State = {
  gameState: string;
  soloParagraph: string;
  activeDuration: number;
  soloDifficulty: string;
  typedParagraph: string;
  cursorPosition: number;
  errors: number;
  wpmGraph: PointT[];
  errorGraph: PointT[];
  account: AccountT;
  accessToken: null | string;
  multiplayer: {
    username: string | null,
    paragraph: string | null;
    roomMembers: string[];
    roomId: string | null;
    countdown: number;
    socketError: null | string;
    startingGame: boolean;
    duration: number;
    gameTimer: number;
    processing: boolean;
    resultGraph: MultiplayerResultGraphT | null
  }
}

type Actions = {
  setAccount: (account: AccountT) => void,
  setAccessToken: (token: string | null) => void,
  setRoomId: (id: string) => void,
  // setBoard: board => set(() => ({board})),
  setMultiplayerPara: (para: string) => void,
  setSoloPara: (para: string) => void,
  setSoloDifficulty: (diff: string) => void,
  setActiveDuration: (dur: number) => void,
  setCountdown: (time: number) => void,
  // setRoomMembers: members => set(() => ({roomMembers: members})),
  incrementCursor: () => void;
  incrementErrors: () => void;
  updateGameState: (state: string) => void;
  updateTypedParagraph: (char: string) => void;
  updateWpmGraph: (point: PointT) => void;
  updateErrorGraph: (point: PointT) => void;
  setSocketError: (error: string) => void;
  setRoomMembers: (members: string[]) => void;
  addRoomMember: (member: string) => void;
  setUsername: (name: string) => void;
  decrementCountdown: () => void;
  showStartingGame: () => void;
  hideStartingGame: () => void;
  setMultiplayerDuration: (d: number) => void;
  setMultiplayerTimer: (d: number) => void;
  tickMultiplayerDuration: () => void;
  showLoading: () => void;
  hideLoading: () => void;
  setMultiplayerResults: (resultGraph: MultiplayerResultGraphT) => void;
}

export const useStore = create<State & Actions>((set) => ({
  soloParagraph: getParagraph(),
  lobbyParagraph: "",
  activeDuration: DURATIONS[0],
  soloDifficulty: DIFFICULTIES.EASY,
  typedParagraph: "",
  cursorPosition: 0,
  errors: 0,
  multiplayer: {
    username: null,
    paragraph: null,
    roomMembers: [],
    roomId: null,
    countdown: 10,
    socketError: null,
    startingGame: false,
    duration: 0,
    gameTimer: 0,
    processing: false,
    resultGraph: null
  },
  wpmGraph: [],
  errorGraph: [],
  gameState: GAME_STATES.IDLE,
  account: {email: "", username: ""},
  accessToken: null,
  setAccount: (account) => set(() => ({account})),
  setAccessToken: (token) => set(() => ({accessToken: token})),
  setRoomId: id => set((state) => ({multiplayer: {...state.multiplayer, roomId: id}})),
  setMultiplayerPara: para => set((state) => ({multiplayer: {...state.multiplayer, paragraph: para}})),
  setSoloPara: para => set(() => ({soloParagraph: para})),
  setSoloDifficulty: diff => set(() => ({soloDifficulty: diff})),
  setActiveDuration: dur => set(() => ({activeDuration: dur})),
  incrementCursor: () => set(state => ({cursorPosition: state.cursorPosition + 1})),
  incrementErrors: () => set(state => ({errors: state.errors + 1})),
  updateGameState: (state) => set(() => ({gameState: state})),
  updateWpmGraph: (p) => set((state) => ({wpmGraph: [...state.wpmGraph, p]})),
  updateErrorGraph: (p) => set((state) => ({errorGraph: [...state.errorGraph, p]})),
  updateTypedParagraph: (char) => set((state) => ({typedParagraph: state.typedParagraph + char})),
  setSocketError: (err) => set((state) => ({multiplayer: {...state.multiplayer, socketError: err}})),
  setRoomMembers: (m) => set((state) => ({multiplayer: {...state.multiplayer, roomMembers: m}})),
  addRoomMember: (m) => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      roomMembers: [m, ...state.multiplayer.roomMembers]
    }
  })),
  setUsername: (name) => set((state) => ({multiplayer: {...state.multiplayer, username: name}})),
  setCountdown: time => set((state) => ({multiplayer: {...state.multiplayer, waitingTimeout: time}})),
  decrementCountdown: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      countdown: Math.max(state.multiplayer.countdown - 1, 0)
    }
  })),
  showStartingGame: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      startingGame: true,
    }
  })),
  hideStartingGame: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      startingGame: false,
    }
  })),
  setMultiplayerDuration: (d) => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      duration: d,
    }
  })),
  setMultiplayerTimer: (d) => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      gameTimer: d,
    }
  })),
  tickMultiplayerDuration: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      gameTimer: Math.max(state.multiplayer.gameTimer - 1, 0),
    }
  })),
  setMultiplayerResults: (results) => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      resultGraph: results,
    }
  })),
  showLoading: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      processing: true,
    }
  })),
  hideLoading: () => set((state) => ({
    multiplayer: {
      ...state.multiplayer,
      processing: false,
    }
  })),
}));