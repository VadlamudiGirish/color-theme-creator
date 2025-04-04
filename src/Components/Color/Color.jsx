import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDelete, onUpdate }) {
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleColorUpdate(updatedColor) {
    setEditMode(false);
    onUpdate(updatedColor);
  }

  function handleColorDelete() {
    onDelete(color.id);
  }

  function invertHex(hex) {
    hex = hex.replace(/^#/, "");
    hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
    const num = parseInt(hex, 16);
    const inverted = (num ^ 0xffffff) & 0xffffff;
    return `#${inverted.toString(16).padStart(6, "0").toUpperCase()}`;
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <CopyToClipboard color={color} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <div
        style={{
          display: "inline",
          color: color.hex,
          backgroundColor: invertHex(color.hex),
        }}
      >
        Overall Contrast Score: {color.accessibility}
      </div>
      <div className="action-container">
        <>
          {confirmMessage ? (
            <div className="color-card-highlight">
              <p>Really delete?</p>
              <button
                onClick={handleColorDelete}
                style={{ color: color.hex, margin: "5px" }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmMessage(false)}
                style={{ color: color.hex, margin: "5px" }}
              >
                No
              </button>
            </div>
          ) : editMode ? (
            <ColorForm
              onSubmitColor={handleColorUpdate}
              currentColor={color}
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <div className="button-group">
              <button
                onClick={() => {
                  setEditMode(false);
                  setConfirmMessage(true);
                }}
                style={{ color: color.hex }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setConfirmMessage(false);
                  setEditMode(true);
                }}
                style={{ color: color.hex }}
              >
                Edit
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
