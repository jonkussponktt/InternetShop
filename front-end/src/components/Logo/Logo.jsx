import "./Logo.css";
import logo from "../../assets/logo.svg";

export function Logo({ comebackHandler }) {
  return (
    <div className="logo" onClick={comebackHandler}>
      <img src={logo} alt="Logo" />
    </div>
  );
}
