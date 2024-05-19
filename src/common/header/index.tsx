import useDarkMode from "../../hooks/useDarkMode.ts";
import {MdOutlineLightMode} from "react-icons/md";
import {WiMoonAltWaxingCrescent4} from "react-icons/wi";
import {Link} from "react-router-dom";

export function Header() {
  const {darkMode, toggleTheme} = useDarkMode();
  return (
    <div className="container max-w-7xl py-4 text-nord2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold dark:text-nord6">Rocket Type</Link>
        <button
          aria-label="toggle theme"
          onClick={toggleTheme}
          className="dark:text-nord6"
        >
          {darkMode ? <MdOutlineLightMode size={32}/> : <WiMoonAltWaxingCrescent4 size={32}/>}
        </button>
      </div>
    </div>
  );
}