import {useNavigate} from "react-router-dom";
import {gradient} from "../../utils";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 justify-center items-center container">
      <p className="good-font text-nord0 font-black text-6xl">Improve your typing with</p>
      <p
        className={`good-font font-black text-7xl py-4 ${gradient} bg-clip-text text-transparent`}>Rocket
        Type</p>
      <p className="good-font text-nord1 text-lg text-center mx-auto my-8">Welcome to Rocket Type, the ultimate web
        application for improving your typing speed and accuracy! <br/>Whether you're a beginner looking to learn touch
        typing or a seasoned typist aiming to reach new heights<br/> we've got you covered.</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/solo")}
          className="good-font text-white hover:text-gray-200 bg-zinc-800 border border-zinc-700 rounded-full px-6 py-2 text-md font-medium">
          Practice
        </button>
        <button
          // onClick={() => props.setOpenModal("default")}
          className={`good-font text-white ${gradient} rounded-full px-6 py-2 text-md font-medium`}>
          Compete
        </button>
      </div>
    </div>
  );
}