import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const [enabled, setEnabled] = useState(theme == "dark");

  const handleThemeChange = (enabled) => {
    setTheme(enabled ? "dark" : "light");
    setEnabled(enabled);
  };

  return { theme, enabled, handleThemeChange };
}
