import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { CommentView } from "./CommentView";
import { PasteView } from "./PasteView";

export interface IPaste {
  id: string;
  title: string;
  content: string;
  time: string;
}
type View = "CommentView" | "PasteView"

export function ViewPastesPage(): JSX.Element {
  const [pasteArray, setPasteArray] = useState<IPaste[]>([]);
  const [view, setView] = useState<View>("PasteView");
  const [currentPasteId, setCurrentPasteId] = useState<string>("");
  // useEffect (()=>{

  // }, [])

  const handleViewPasteComments = (clickedPasteId: string) => {
    setView("CommentView");
    setCurrentPasteId(clickedPasteId);
  }
  async function getRecentPastes() {
    const response = await axios.get(baseUrl + "/pastes");
    const data = response.data;
    setPasteArray(data);
  }

  useEffect(() => {
    getRecentPastes();
  }, []);
  if (view === "PasteView"){
    return (
    <div className="ctn-paste">
    {pasteArray.map((paste, index) => {
      return (
        <PasteView
          handleViewPasteComments={handleViewPasteComments}
          paste={paste}
          key={paste.id}
          getRecentPastes={getRecentPastes}
        />
      );
    })}
  </div>
    )
} else{ return(
<CommentView pasteId={currentPasteId}/>)
}
  }

