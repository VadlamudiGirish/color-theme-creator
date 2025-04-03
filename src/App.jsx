import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleCreateColor(newColor) {
    setColors([newColor, ...colors]);
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
  }

  return (
    <>
      <h1 className="text">Theme Creator</h1>
      <ColorForm onSubmitColor={handleCreateColor} />
      {colors.length === 0 ? (
        <p className="text" style={{ alignSelf: "center" }}>
          No colors left! Start adding new colors 🌈
        </p>
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
