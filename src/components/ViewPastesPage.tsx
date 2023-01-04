import axios from "axios"
import { useEffect, useState } from "react"
import { baseUrl } from "../App";

interface IPaste {
    id: string;
    title: string;
    content: string; 
    time: string;
}

export function ViewPastesPage(): JSX.Element{
    const [pasteArray, setPasteArray] = useState<IPaste[]>([]);

    async function getRecentPastes () {
        const response = await axios.get(baseUrl+"/pastes")
        const data = response.data;
        setPasteArray(data);
    }

    useEffect(() => {
        getRecentPastes();
    }, []);
    console.log("TIME", pasteArray[0])

    return (
        <div className="ctn-paste">
        {pasteArray.map((paste, index) => {
            return (
                <div key={index} className="paste">
                    <h1>
                        {paste.title}
                    </h1>
                    <p>{paste.content}</p>
                    <small>Date: {paste.time.substring(0,10)}, Time: {paste.time.substring(11,16)}</small>
                </div>
            )
        })}
        </div>
    )
}