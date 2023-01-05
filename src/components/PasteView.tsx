import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";
import { IPaste } from "./ViewPastesPage";

interface PasteViewProps {
  paste: IPaste;
}

export function PasteView({ paste }: PasteViewProps): JSX.Element {
  const [showMore, setShowMore] = useState<boolean>(false);
  const handleDeletePaste = async () => {
    await axios.delete(baseUrl + "/pastes/" + paste.id)
    await axios.get(baseUrl + "/pastes/")

  }
  console.log(paste.content);
  return (
    <>
      <div className="paste">
        {paste.title ? <h1>{paste.title}</h1> : <br></br>}

        {!showMore && (
          <>
            <p className="paste-reduced">{paste.content}</p>
            {paste.content.length > 450 ? (
              <div className="more-less-btn" onClick={() => setShowMore(true)}>
                ...more
              </div>
            ) : (
              <br />
            )}
          </>
        )}

        {showMore && (
          <>
            <p className="paste-complete">{paste.content}</p>
            <div onClick={() => setShowMore(false)} className="more-less-btn">
              ...less
            </div>
          </>
        )}
        <>
          <small>
            Date: {paste.time.substring(0, 10)}, Time:{" "}
            {paste.time.substring(11, 16)}
          </small>
        </>
        <button className = "del-btn" onClick = {handleDeletePaste} >Delete</button>
      </div>
    </>
  );
}
