import { initialColors, initialThemes } from "./lib/colors";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import ThemeForm from "./Components/ThemeForm/ThemeForm";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import { uid } from "uid";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes.map((theme) => ({
      ...theme,
      isDefault: theme.id === "t1",
    })),
  });

  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [selectedTheme, setSelectedTheme] = useState(() => {
    const defaultTheme = themes.find((t) => t.isDefault);
    return defaultTheme || themes[0];
  });

  useEffect(() => {
    if (!selectedTheme && themes.length > 0) {
      const defaultTheme = themes.find((t) => t.isDefault) || themes[0];
      setSelectedTheme(defaultTheme);
    }
  }, [themes, selectedTheme]);

  const themeColors = colors.filter((color) =>
    selectedTheme?.colors?.includes(color.id)
  );

  function handleCreateColor(newColor) {
    // Add new color to global list
    setColors([newColor, ...colors]);

    // Add color to current theme if it's not default
    if (!selectedTheme.isDefault) {
      const updatedThemes = themes.map((theme) =>
        theme.id === selectedTheme.id
          ? { ...theme, colors: [...theme.colors, newColor.id] }
          : theme
      );
      setThemes(updatedThemes);
      setSelectedTheme((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.id],
      }));
    }

    checkContrast(newColor);
  }

  function handleDeleteTheme(themeId) {
    const themeToDelete = themes.find((t) => t.id === themeId);
    // Prevent deleting default theme
    if (themeToDelete?.isDefault) return;

    setThemes(themes.filter((theme) => theme.id !== themeId));
    if (selectedTheme?.id === themeId) {
      setSelectedTheme(themes.find((t) => t.isDefault) || themes[0]);
    }
  }

  function handleDeleteColor(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  function handleUpdateColor(updatedColor) {
    setColors(
      colors.map((color) =>
        color.id === updatedColor.id ? { ...color, ...updatedColor } : color
      )
    );
    checkContrast(updatedColor);
  }

  function handleCreateTheme(name) {
    const newTheme = {
      id: uid(),
      name,
      colors: [],
      isDefault: false,
    };
    setThemes([...themes, newTheme]);
    setSelectedTheme(newTheme);
  }

  function handleUpdateTheme(themeId, newName) {
    if (themes.find((t) => t.id === themeId)?.isDefault) return;
    setThemes(
      themes.map((theme) =>
        theme.id === themeId ? { ...theme, name: newName } : theme
      )
    );
    setSelectedTheme((prev) => ({ ...prev, name: newName }));
  }

  async function checkContrast(color) {
    try {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            colors: [color.hex, color.contrastText],
          }),
        }
      );

      const { overall } = await response.json();

      setColors((prevColors) =>
        prevColors.map((c) =>
          c.id === color.id ? { ...c, accessibility: overall } : c
        )
      );
    } catch (error) {
      console.error("Contrast check failed:", error);
      setColors((prevColors) =>
        prevColors.map((c) =>
          c.id === color.id ? { ...c, accessibility: "Error checking" } : c
        )
      );
    }
  }

  useEffect(() => {
    colors.forEach((color) => {
      if (!color.accessibility) checkContrast(color);
    });
  });

  return (
    <>
      <h1 className="text">Theme Creator</h1>
      <ThemeForm
        themes={themes}
        onCreateTheme={handleCreateTheme}
        onDeleteTheme={handleDeleteTheme}
        onUpdateTheme={handleUpdateTheme}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />

      <ColorForm onSubmitColor={handleCreateColor} />

      {themeColors.length === 0 ? (
        <p className="text">
          No colors in this theme! Start adding new colors 🌈
        </p>
      ) : (
        themeColors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDelete={handleDeleteColor}
            onUpdate={handleUpdateColor}
          />
        ))
      )}
    </>
  );
}

export default App;
