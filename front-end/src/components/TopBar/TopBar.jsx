import './TopBar.css';

export function TopBar({ children }) {
  return (
    <div className="top-bar">
      {children}
    </div>
  );
}