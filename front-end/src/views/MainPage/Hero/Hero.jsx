import "./Hero.css";
import heroImage from "../../../assets/people.png";

export function Hero({ children }) {
  return (
    <div className="hero">
      <img src={heroImage} alt="Hero" />
      {children}
    </div>
  );
}