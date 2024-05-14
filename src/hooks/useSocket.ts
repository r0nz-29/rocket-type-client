import {io} from "socket.io-client";
import {GAME_STATES, useStore} from "../store";

const URL = "https://rocket-server-a2ie.onrender.com";
console.log(URL);
export const socket = io(URL, {autoConnect: false});

export default function useSocket() {
  const {
    setSocketError,
    updateGameState,
    setRoomMembers,
    addRoomMember,
    decrementCountdown,
    setMultiplayerPara,
    setCountdown,
    setRoomId,
    setMultiplayerDuration,
    setMultiplayerTimer,
    tickMultiplayerDuration,
    setMultiplayerResults
  } = useStore();

  const {roomMembers} = useStore(state => state.multiplayer);

  function syncResults(roomId: string, wpm: number, errors: number) {
    socket.emit("game:result:sync", {roomId, wpm, errors});
  }

  function startCountdown(roomId: string) {
    console.log("sent" + roomId);
    socket.emit("game:countdown:start", roomId);
  }

  function gameListeners() {
    socket.on("game:tick", () => {
      tickMultiplayerDuration();
    });

    socket.on("game:end", () => {
      updateGameState(GAME_STATES.MULTIPLAYER.COMPLETED);
    });

    socket.on("game:result:publish", (resultGraph) => {
      console.log(resultGraph);
      setMultiplayerResults(resultGraph);
      updateGameState(GAME_STATES.MULTIPLAYER.RESULTS);
    });
  }

  function countdownListeners() {
    socket.on("game:countdown:started", ({para, duration, countdown}) => {
      if (!para || !countdown || !duration) return;
      setMultiplayerDuration(duration);
      setMultiplayerTimer(duration);
      setMultiplayerPara(para);
      setCountdown(countdown);
      updateGameState(GAME_STATES.MULTIPLAYER.COUNTDOWN);
    });

    socket.on("game:countdown:tick", () => {
      decrementCountdown();
    });

    socket.on("game:countdown:end", () => {
      // socket.emit("game:start", roomId);
      updateGameState(GAME_STATES.TYPING);
    });
  }

  function create(username: string) {
    connect(username);
    socket.emit("room:create");
  }

  function join(roomId: string, username: string) {
    connect(username);
    socket.emit("room:join", {roomId});
  }
  
  function connect(username: string) {
    socket.auth = {username};
    socket.connect();

    socket.onAny((event, args) => console.log(`got event ${event} with ${JSON.stringify(args)}`));

    socket.on("room:joined", ({roomId, username}) => {
      if (!roomMembers.includes(username)) {
        setRoomId(roomId);
        updateGameState(GAME_STATES.MULTIPLAYER.WAITING);
      } else addRoomMember(username);
    });

    socket.on("fail:username-exists", () => {
      setSocketError("Username already exists");
    });

    socket.on("room:members", (members) => {
      setRoomMembers(members);
    });
  }

  function getRoomMembers(roomId: string) {
    console.log("sending");
    socket.emit("room:get-members", roomId);
  }

  return {
    create,
    join,
    getRoomMembers,
    startCountdown,
    countdownListeners,
    gameListeners,
    syncResults,
    socket,
  };
}