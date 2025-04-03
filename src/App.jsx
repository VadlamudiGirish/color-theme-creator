import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleCreateColor(newColor) {
    setColors([newColor, ...colors]);
    checkContrast(newColor);
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
      <ColorForm onSubmitColor={handleCreateColor} />
      {colors.length === 0 ? (
        <p className="text">No colors left! Start adding new colors 🌈</p>
      ) : (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDelete={handleDeleteColor}
              onUpdate={handleUpdateColor}
            />
          );
        })
      )}
    </>
  );
}

export default App;
