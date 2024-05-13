import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useEffect, useRef} from "react";
import useSocket from "../../hooks/useSocket.ts";
import {GAME_STATES, useStore} from "../../store";
import useNotifications from "../../hooks/useNotification.ts";
import MultiplayerGame from "./room/game.tsx";
import MultiplayerRoom from "./room";

export default function Multiplayer() {
  const createRoomForm = useRef<HTMLFormElement | null>(null);
  const joinRoomForm = useRef<HTMLFormElement | null>(null);
  const {create, join} = useSocket();
  const {socketError} = useStore(state => state.multiplayer);
  const {gameState} = useStore();
  const {errorNotification} = useNotifications();

  function createRoom() {
    const form = createRoomForm.current;
    if (!form) return;
    const formData = new FormData(form);
    const username = (formData.get("username") ?? "") as string;
    if (!username || username === "") return alert("Enter username");
    create(username);
  }

  function joinRoom() {
    const createForm = createRoomForm.current;
    const joinForm = joinRoomForm.current;
    if (!createForm || !joinForm) return;
    const formData = {
      create: new FormData(createForm),
      join: new FormData(joinForm)
    };
    const username = formData.create.get("username");
    const roomId = formData.join.get("roomId");
    if (!username || !roomId) return errorNotification("enter username and room id");
    join(roomId as string, username as string);
  }

  useEffect(() => {
    if (!socketError) return;
    errorNotification(socketError);
  }, [socketError, errorNotification]);

  // counter before game starts
  if (new Set([GAME_STATES.MULTIPLAYER.COUNTDOWN, GAME_STATES.TYPING, GAME_STATES.MULTIPLAYER.COMPLETED]).has(gameState)) return <MultiplayerGame/>;

  // view room and participants
  if (gameState === GAME_STATES.MULTIPLAYER.WAITING) return <MultiplayerRoom/>;

  // create or join room
  return (
    <div className="container max-w-7xl grid grid-cols-2 items-center flex-1">
      <div className="p-4">
        <p className="text-lg font-bold text-center">Create Room</p>
        <br/>
        <form className="flex flex-col gap-y-4" ref={createRoomForm}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" placeholder="your username"/>
          </FormControl>
          <Button onClick={createRoom} className="w-full" colorScheme="teal">Create Room</Button>
        </form>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-center">Join Room</p>
        <br/>
        <form className="flex flex-col gap-y-4" ref={joinRoomForm}>
          <FormControl>
            <FormLabel>Room Id</FormLabel>
            <Input type="text" name="roomId" placeholder="ask your friends for the room id"/>
          </FormControl>
          <Button onClick={joinRoom} className="w-full" colorScheme="teal">Join Room</Button>
        </form>
      </div>
    </div>
  );
}