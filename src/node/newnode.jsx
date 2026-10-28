import { useState } from "react";
import "../css/csscolor/basicnode.css";

export const NewNode = () => {
  const [open, setOpen] = useState(false);
  const [ setSelected] = useState(null);

  const options = ["Start Node", "Node", "End Node"];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="new-node-container">
      <button id="new-node" onClick={handleClick}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {open && (
        <div className="new-node-wrapper">
          {options.map((option) => (
            <button key={option} onClick={() => handleSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};