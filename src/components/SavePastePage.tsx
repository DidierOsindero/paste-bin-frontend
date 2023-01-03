import { useState } from "react"
import axios from "axios"; 
import { baseUrl } from "../App";

interface INewPaste {
    title: string;
    content: string; 
}

export function SavePaste(): JSX.Element{
    const [pasteData, setPasteData] = useState<INewPaste>({title: "", content: ""})
    const updatePasteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasteData(prev => {return {...prev, title: e.target.value}})
    }
    const updatePasteContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasteData(prev => {return {...prev, content: e.target.value}})
    }
    
    const handleSubmit = () => {
        axios.post(baseUrl+"/pastes", pasteData)
    }
    return (
        <form onSubmit = {handleSubmit}>
        <input onChange = {updatePasteTitle} placeholder = "Write your title" value = {pasteData.title}/> 
        <input onChange = {updatePasteContent} placeholder = "Write your content" value = {pasteData.content}/>
        <input type = "submit" value="submit"/>
        </form>
    )
}

// setMyState(prev => prev+1)
// const myObj = {name : maria, surname: ten sierra}
// setMyObject(prev => {...prev, name : didier})