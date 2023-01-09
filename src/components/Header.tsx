import { View } from "./MainContent";
// import { Link } from "react-router-dom";

interface HeaderProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export function Header({ setView }: HeaderProps): JSX.Element {
  return (
    <div className="header-div">
      <h1 className="pastes-title" onClick={() => setView("PasteView")}>
        Paste Bin
      </h1>
    </div>
  );
}
