import {Route, Routes} from "react-router-dom";
import {Header} from "./common/header";
import {Home} from "./pages/home";
import SoloGame from "./pages/solo";

function App() {
  return (
    <div className="flex flex-col items-stretch w-full min-h-screen bg-nord6 dark:bg-nord1">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/solo" element={<SoloGame/>}/>
      </Routes>
    </div>
  );
}

export default App;
