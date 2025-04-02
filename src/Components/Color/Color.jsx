import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [confirmMessage, setConfirmMessage] = useState(false);

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
      {!confirmMessage ? (
        <button
          onClick={() => setConfirmMessage(true)}
          className="color-card-hightlight"
        >
          Delete
        </button>
      ) : (
        <div className="color-card-highlight">
          <p>Really delete?</p>
          <button onClick={() => onDelete(color.id)} style={{ margin: "5px" }}>
            Yes
          </button>
          <button
            onClick={() => setConfirmMessage(false)}
            style={{ margin: "5px" }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
