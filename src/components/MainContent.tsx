import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { baseUrl } from "../App";
import { CommentView } from "./CommentView";
import { SavePaste } from "./SavePastePage";
import { ViewPastesPage } from "./ViewPastesPage";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import { Header } from "./Header";


export type View = "CommentView" | "PasteView"
export interface IPaste {
    id: string;
    title: string;
    content: string;
    time: string;
  }

export function MainContent(): JSX.Element {
  const [view, setView] = useState<View>("PasteView");
  const [pasteArray, setPasteArray] = useState<IPaste[]>([]);
  const [currentPasteId, setCurrentPasteId] = useState<string>("");

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

  if (view === "PasteView") {
    return (
    <>
      <Header setView={setView}/>
        <SavePaste /> 
        <ViewPastesPage view={view} setView={setView} pasteArray={pasteArray} getRecentPastes={getRecentPastes} handleViewPasteComments={handleViewPasteComments}/>
        
    </>
    );
} else {
    return (
    <>
    <Header setView={setView}/>
        <CommentView pasteId={currentPasteId}/>
    </>
    );
} 
  }