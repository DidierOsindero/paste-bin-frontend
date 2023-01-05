import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { PasteView } from "./PasteView";

export interface IPaste {
  id: string;
  title: string;
  content: string;
  time: string;
}

export function ViewPastesPage(): JSX.Element {
  const [pasteArray, setPasteArray] = useState<IPaste[]>([]);

  async function getRecentPastes() {
    const response = await axios.get(baseUrl + "/pastes");
    const data = response.data;
    setPasteArray(data);
  }

  useEffect(() => {
    getRecentPastes();
  }, []);


  return (
    <div className="ctn-paste">
      {pasteArray.map((paste, index) => {
        return <PasteView paste={paste} key={paste.id} getRecentPastes={getRecentPastes}/>;
      })}
    </div>
  );
}
