import { SavePaste } from "./components/SavePastePage";
import { ViewPastesPage } from "./components/ViewPastesPage";
import "./App.css";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://didier-maria-pastebin-api.onrender.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  return (
    <>
      <SavePaste />
      <ViewPastesPage />
    </>
  );
}

export default App;
