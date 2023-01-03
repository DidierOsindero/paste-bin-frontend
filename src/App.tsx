import { SavePaste } from "./components/SavePastePage";
import { greet } from "./utils/greet";


export const baseUrl = process.env.NODE_ENV === "production"
? "https://didier-maria-pastebin-api.onrender.com"
: "http://localhost:4000"

function App(): JSX.Element {
  return <SavePaste/>
}

export default App;
