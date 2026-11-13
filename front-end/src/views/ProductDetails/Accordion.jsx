import "./styles/Accordion/Accordion.css";
import { useState } from "react";
import accordionDown from "../../assets/accordionDown.svg";
import accordionUp from "../../assets/accordionUp.svg";

export function Accordion({ title, open, children }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span>{isOpen ? <img src={accordionUp} /> : <img src={accordionDown} />}</span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}
