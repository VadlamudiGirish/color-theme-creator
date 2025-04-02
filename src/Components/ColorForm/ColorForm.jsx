import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";
import { uid } from "uid";

export default function ColorForm({ onSubmitColor, currentColor }) {
  let defaultFormData = {
    role: "some color",
    hex: "#123456",
    contrastText: "#ffffff",
  };

  defaultFormData = currentColor || defaultFormData;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    currentColor
      ? onSubmitColor({ ...data, id: currentColor.id })
      : onSubmitColor({ ...data, id: uid() });

    event.target.reset();
    event.target.role.focus();
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        <span>Role</span>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={defaultFormData.role}
        />
      </label>
      <label htmlFor="hex">
        <span>Hex</span>
        <ColorInput id="hex" defaultValue={defaultFormData.hex} />
      </label>
      <label htmlFor="contrastText">
        <span>Contrast Text</span>
        <ColorInput
          id="contrastText"
          defaultValue={defaultFormData.contrastText}
        />
      </label>
      <button>{!currentColor ? "ADD COLOR" : "UPDATE COLOR"}</button>
    </form>
  );
}
