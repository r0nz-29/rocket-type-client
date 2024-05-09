import useDarkMode from "../../hooks/useDarkMode.ts";
import {IconButton} from "@chakra-ui/react";
import {MdOutlineLightMode} from "react-icons/md";
import {WiMoonAltWaxingCrescent4} from "react-icons/wi";
import {Link} from "react-router-dom";

export function Header() {
  const {darkMode, toggleTheme} = useDarkMode();
  return (
    <div className="container max-w-7xl py-4 text-nord2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Rocket Type</Link>
        <IconButton
          aria-label="toggle theme"
          icon={darkMode ? <MdOutlineLightMode size={32}/> : <WiMoonAltWaxingCrescent4 size={32}/>}
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
}