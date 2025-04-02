import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        <span>Role</span>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <label htmlFor="hex">
        <span>Hex</span>
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <label htmlFor="contrastText">
        <span>Contrast Text</span>
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <button>ADD COLOR</button>
    </form>
  );
}
