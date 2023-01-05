import { SavePaste } from "./components/SavePastePage";
import { ViewPastesPage } from "./components/ViewPastesPage";
import "./App.css";
import { CommentView } from "./components/CommentView";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://didier-maria-pastebin-api.onrender.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  return (
    <>
      <SavePaste />
      <ViewPastesPage />
      <CommentView pasteId={"5"} />
    </>
  );
}

export default App;
