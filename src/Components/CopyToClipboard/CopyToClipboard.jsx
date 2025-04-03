import { useEffect, useState } from "react";

export default function CopyToClipboard({ color }) {
  const [confirmationMessage, setConfirmationMessage] = useState("");

  async function handleColorCopy() {
    try {
      await navigator.clipboard.writeText(color.hex);
    } catch (error) {
      setConfirmationMessage(error);
      return;
    }
    setConfirmationMessage("copied to clipboard!");
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setConfirmationMessage("");
    }, 3000);
    return () => clearInterval(intervalId);
  });

  return confirmationMessage ? (
    <p
      style={{
        display: "inline",
        margin: "5px",
        color: `${color.contrastText}`,
      }}
    >
      {confirmationMessage}
    </p>
  ) : (
    <button
      onClick={handleColorCopy}
      style={{ color: color.hex, margin: "5px" }}
    >
      copy
    </button>
  );
}
