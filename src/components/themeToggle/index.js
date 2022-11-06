import { useTheme, systemTheme } from "next-themes";
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme(systemTheme);

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        className="fixed transition-all duration-500 rounded-l-full bottom-32 -right-1 w-14 hover:w-20 pr-5 pl-3 py-2 z-50 dark:text-white text-black bg-gray-50 dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-50 text-3xl shadow-xl"
        onClick={() => toggleTheme()}
      >
        {theme == "light" ? <RiMoonFill /> : <RiSunFill />}
      </button>
    </div>
  );
};

export default ThemeChanger;
