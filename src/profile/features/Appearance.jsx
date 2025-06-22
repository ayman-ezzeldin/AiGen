import ThemeOption from "../components/ThemeOption";
import systemTheme from "../../profile/assets/systemTheme.png";
import lightTheme from "../../profile/assets/lightTheme.png";
import { useDispatch, useSelector } from "react-redux";
import { updateTheme } from "../../store/profile/settingsSlice";
import { Monitor, Moon, Sun } from "lucide-react";

const Appearance = () => {
  const selectedTheme = useSelector((state) => state.settings.appearance.theme);
  const dispatch = useDispatch();

  const handleThemeSelect = (theme) => {
    dispatch(updateTheme(theme));
  };

  return (
    <div>
      <h3 className="text-base md:text-lg">Preference mode</h3>
      <div className="grid max-md:justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 pt-8 gap-12">
        <ThemeOption
          themeimage={systemTheme}
          option="System theme"
          isSelected={selectedTheme === "systemTheme"}
          onSelect={() => handleThemeSelect("systemTheme")}
        >
          <Monitor />
        </ThemeOption>
        <ThemeOption
          themeimage={lightTheme}
          option="Light theme"
          isSelected={selectedTheme === "lightTheme"}
          onSelect={() => handleThemeSelect("lightTheme")}
        >
          <Sun />
        </ThemeOption>
        <ThemeOption
          themeimage={systemTheme}
          option="Dark theme"
          isSelected={selectedTheme === "darkTheme"}
          onSelect={() => handleThemeSelect("darkTheme")}
        >
          <Moon />
        </ThemeOption>
      </div>
    </div>
  );
};

export default Appearance;
