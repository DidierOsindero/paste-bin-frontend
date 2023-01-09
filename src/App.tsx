import "./App.css";
import { MainContent } from "./components/MainContent";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://didier-maria-pastebin-api.onrender.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  return (
    <>
      <MainContent />
    </>
  );
}

export default App;
