import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleCreateColor(newColor) {
    setColors([newColor, ...colors]);
  }

  function handleDeleteColor(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  return (
    <>
      <h1 className="text">Theme Creator</h1>
      <ColorForm onSubmitColor={handleCreateColor} />
      {colors.length === 0 ? (
        <p className="text">No colors left! Start adding new colors 🌈</p>
      ) : (
        colors.map((color) => {
          return (
            <Color key={color.id} color={color} onDelete={handleDeleteColor} />
          );
        })
      )}
    </>
  );
}

export default App;
