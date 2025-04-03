import { useState } from "react";
import "./ThemeForm.css";

export default function ThemeForm({
  themes,
  onCreateTheme,
  onDeleteTheme,
  onUpdateTheme,
  selectedTheme,
  setSelectedTheme,
}) {
  const [themeName, setThemeName] = useState("");
  const [editMode, setEditMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (themeName.trim()) {
      onCreateTheme(themeName);
      setThemeName("");
    }
  }

  function handleUpdate() {
    if (themeName.trim() && selectedTheme && !selectedTheme.isDefault) {
      onUpdateTheme(selectedTheme.id, themeName);
      setThemeName("");
      setEditMode(false);
    }
  }

  return (
    <form className="theme-form" onSubmit={handleSubmit}>
      <div className="theme-selector">
        <label htmlFor="theme-select">
          <span>Select Theme:</span>
          <select
            id="theme-select"
            value={selectedTheme?.id || ""}
            onChange={(e) => {
              const theme = themes.find((t) => t.id === e.target.value);
              setSelectedTheme(theme || null);
            }}
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name} {theme.isDefault ? "(Default)" : ""}
              </option>
            ))}
          </select>
        </label>

        {selectedTheme && !selectedTheme.isDefault && (
          <div className="theme-actions">
            <button
              style={{ marginLeft: "10px" }}
              type="button"
              onClick={() => {
                setEditMode(true);
                setThemeName(selectedTheme.name);
              }}
              disabled={selectedTheme.isDefault}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this theme?")
                ) {
                  onDeleteTheme(selectedTheme.id);
                }
              }}
              disabled={selectedTheme.isDefault}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {!editMode ? (
        <div className="theme-creator">
          <label htmlFor="theme-name">
            <span>New Theme Name:</span>
            <input
              type="text"
              id="theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
            />
          </label>
          <button type="submit">Create New Theme</button>
        </div>
      ) : (
        <div className="theme-editor">
          <label htmlFor="edit-theme-name">
            <span>Edit Theme Name:</span>
            <input
              type="text"
              id="edit-theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleUpdate}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setThemeName("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
