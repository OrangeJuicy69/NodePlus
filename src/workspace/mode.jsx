import { useState, useEffect } from "react";



export default function Mode() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("ui-mode") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem("ui-mode", mode);
    } catch {
      
    }
  }, [mode]);

  const next = mode === "light" ? "dark" : "light";

  return (
    <div className="mode">
      <button
        id="ui-mode"
        className="btn-mode"
        onClick={() => setMode(next)}
      >
        {next === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
}