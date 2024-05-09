import {Route, Routes} from "react-router-dom";
import {IconButton} from "@chakra-ui/react";
import useDarkMode from "./hooks/useDarkMode.ts";
import {CiDark, CiLight} from "react-icons/ci";

function Header() {
  const {darkMode, toggleTheme} = useDarkMode();
  return (
    <div className="container max-w-7xl py-4 text-nord2">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Rocket Type</p>
        <IconButton
          aria-label="toggle theme"
          icon={darkMode ? <CiLight/> : <CiDark/>}
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center container">
      <p className="good-font text-nord0 font-black text-6xl mb-2">Improve your typing with</p>
      <p
        className="good-font font-black text-6xl pb-2 bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">Rocket
        Type</p>
      <p className="good-font text-nord1 text-lg text-center mx-auto my-8">Welcome to Rocket Type, the ultimate web
        application for improving your typing speed and accuracy! <br/>Whether you're a beginner looking to learn touch
        typing or a seasoned typist aiming to reach new heights<br/> we've got you covered.</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          // onClick={() => navigate("/solo")}
          className="good-font text-white bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 rounded-full px-6 py-2 text-md font-medium">
          Solo Mode
        </button>
        <button
          // onClick={() => props.setOpenModal("default")}
          className="good-font text-white hover:text-gray-200 bg-zinc-800 border border-zinc-700 rounded-full px-6 py-2 text-md font-medium">
          Multiplayer
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col items-stretch w-full min-h-screen bg-nord6 dark:bg-nord1">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
