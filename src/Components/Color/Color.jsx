import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onUpdate }) {
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleColorUpdate(UpdatedColor) {
    setEditMode(false);
    onUpdate(UpdatedColor);
  }

  function handleColorDelete() {
    onDelete(color.id);
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
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      <div className="action-container">
        {confirmMessage ? (
          <div className="color-card-highlight">
            <p>Really delete?</p>
            <button
              onClick={handleColorDelete}
              style={{ backgroundColor: color.contrastText, color: color.hex }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmMessage(false)}
              style={{ backgroundColor: color.contrastText, color: color.hex }}
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
              className="color-card-hightlight"
              style={{
                border: editMode ? `2px solid ${color.contrastText}` : "none",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setConfirmMessage(false);
                setEditMode(true);
              }}
              className="color-card-hightlight"
              style={{
                border: confirmMessage
                  ? `2px solid ${color.contrastText}`
                  : "none",
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
