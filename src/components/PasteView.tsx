import { useState } from "react";
import { IPaste } from "./ViewPastesPage";


interface PasteViewProps{
    paste: IPaste
}


export function PasteView({paste}: PasteViewProps): JSX.Element{
    const [showMore, setShowMore] = useState<boolean>(false)
    return (
        <>
         <div className="paste">
        <h1>
            {paste.title}
        </h1>
        {showMore ? (<><p>{paste.content}</p><div onClick = {() => setShowMore(false)}>...less</div></>): (<>
        <p>{paste.content}</p>
        <div onClick = {() => setShowMore(true)}>...more</div></>)}
        <small>Date: {paste.time.substring(0,10)}, Time: {paste.time.substring(11,16)}</small>
        </div>
        </>
        )
}