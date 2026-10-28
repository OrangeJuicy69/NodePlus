import { useRef } from "react";
import "../css/csscolor/basicnode.css";

export const ImportJSON = ({ onImport }) => {
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    let parsed;
    try {
      const text = await file.text();
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("JSON-Parse-Fehler:", err);
      alert("Die Datei ist kein gültiges JSON.");
      console.error("check *import-json.jsx* if the JSON dont work")
      return;
    }

    if (!Array.isArray(parsed)) {
      alert("Ungültiges Format: Die Datei muss ein Array von Nodes enthalten.");
      return;
    }

    if (typeof onImport !== "function") {
      console.error("ImportJSON: Prop onImport fehlt.");
      
      return;
    }

    onImport(parsed);
  };

  return (
    <div className="import-json-container">
      <button id="import-json" onClick={() => inputRef.current?.click()}>
        Import JSON
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};