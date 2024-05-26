import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";
import useSocket from "../../hooks/useSocket.ts";
import {GAME_STATES, useStore} from "../../store";
import useNotifications from "../../hooks/useNotification.ts";
import MultiplayerGame from "./room/game.tsx";
import MultiplayerRoom from "./room";
import {gradient} from "../../utils";

export default function Multiplayer() {
  const {create, join} = useSocket();
  const {socketError} = useStore(state => state.multiplayer);
  const {gameState} = useStore();
  const {errorNotification} = useNotifications();
  const [fields, setFields] = useState({
    username: "", roomId: ""
  });

  function handleFields(e: ChangeEvent<HTMLInputElement>) {
    setFields({...fields, [e.target.name]: e.target.value});
  }

  function createRoom() {
    const username = fields.username;
    if (!username || username === "") return alert("Enter username");
    create(username);
  }

  function joinRoom() {
    const username = fields.username;
    const roomId = fields.roomId;
    if (!username || !roomId) return errorNotification("enter username and room id");
    join(roomId as string, username as string);
  }

  useEffect(() => {
    if (!socketError) return;
    errorNotification(socketError);
  }, [socketError, errorNotification]);

  // counter before game starts
  if (new Set([GAME_STATES.MULTIPLAYER.COUNTDOWN, GAME_STATES.TYPING, GAME_STATES.MULTIPLAYER.COMPLETED, GAME_STATES.MULTIPLAYER.RESULTS]).has(gameState)) return <MultiplayerGame/>;

  // view room and participants
  if (gameState === GAME_STATES.MULTIPLAYER.WAITING) return <MultiplayerRoom/>;

  // create or join room
  return (
    <div className="container dark:text-nord6 max-w-7xl grid grid-cols-2 items-center flex-1">
      <div className="p-4">
        <p className="text-lg font-bold text-center heading-font">Create Room</p>
        <br/>
        <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-y-4">
          <FormControl>
            <FormLabel className="heading-font">Username</FormLabel>
            <Input type="text" name="username" borderColor="transparent" value={fields.username} onChange={handleFields}
                   placeholder="your username"/>
          </FormControl>
          <button onClick={createRoom} className={`w-full py-2 text-white font-bold ${gradient} rounded-full`}>Create
            Room
          </button>
        </form>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-center heading-font">Join Room</p>
        <br/>
        <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-y-4">
          <FormControl>
            <FormLabel className="heading-font">Room Id</FormLabel>
            <Input type="text" name="roomId" borderColor="transparent" value={fields.roomId} onChange={handleFields}
                   placeholder="ask your friends for the room id"/>
          </FormControl>
          <button onClick={joinRoom}
                  disabled={fields.username === "" || fields.roomId === ""}
                  className={`disabled:opacity-25 w-full py-2 text-white font-bold ${gradient} rounded-full`}>Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
