import {Spinner} from "@chakra-ui/react";
import {useStore} from "../../../store";
import {useEffect} from "react";
import useSocket from "../../../hooks/useSocket.ts";
import {gradient} from "../../../utils";

export default function MultiplayerRoom() {
  const {roomMembers, roomId} = useStore(state => state.multiplayer);
  const {getRoomMembers, startCountdown, countdownListeners} = useSocket();

  useEffect(() => {
    if (!roomId) return;
    getRoomMembers(roomId);
  }, [roomId]);

  useEffect(() => {
    countdownListeners();
  }, []);

  function start() {
    if (!roomId) return;
    startCountdown(roomId);
  }

  if (!roomId || !roomMembers) return (
    <div className="container max-w-7xl">
      <p>Multiplayer lobby. please wait...</p>
      <Spinner/>
    </div>
  );

  return (
    <div className="container max-w-7xl flex-1 flex flex-col justify-center items-center">
      <p className="text-2xl font-bold">Invite Code: {roomId}</p>
      <p className="text-lg text-nord3 text-center">
        Invite your friends with the above code.<br/>
        Click begin to start the game.
      </p>
      <br/>
      <p className="text-xl font-bold">People Online</p>
      <div className="flex gap-x-2 items-center w-full flex-wrap justify-center">
        {roomMembers.length ? roomMembers.map(r => <div className="px-4 border border-slate-400 rounded-full"
                                                        key={r}>{r}</div>) : "none"}
      </div>
      <button onClick={start} className={`text-white text-xl ${gradient} px-6 py-2 rounded-full font-bold`}>
        Start
      </button>
    </div>
  );
}
