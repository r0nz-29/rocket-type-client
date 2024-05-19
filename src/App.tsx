import {Route, Routes} from "react-router-dom";
import {Header} from "./common/header";
import {Home} from "./pages/home";
import SoloGame from "./pages/solo";
import Multiplayer from "./pages/multiplayer";
import {useStore} from "./store";
import {Spinner} from "@chakra-ui/react";

function App() {
  const {processing} = useStore(state => state.multiplayer);
  return (
    <div className="flex flex-col items-stretch w-full min-h-screen bg-nord6 dark:bg-nord0">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/solo" element={<SoloGame/>}/>
        <Route path="/multiplayer" element={<Multiplayer/>}/>
      </Routes>
      {
        processing && (
          <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/[.5] flex justify-center items-center">
            <div className="rounded-lg bg-white flex justify-center items-center p-4">
              <Spinner />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
