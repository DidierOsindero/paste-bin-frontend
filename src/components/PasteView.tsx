import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";
import { IPaste } from "./MainContent";

interface PasteViewProps {
  paste: IPaste;
  getRecentPastes: () => void;
  handleViewPasteComments: (pasteId: string) => void;
}

export function PasteView({
  paste,
  getRecentPastes,
  handleViewPasteComments,
}: PasteViewProps): JSX.Element {
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleDeletePaste = async () => {
    await axios.delete(baseUrl + "/pastes/" + paste.id);
    getRecentPastes();
  };
  return (
    <>
      <div className="paste">
        <div className="paste-grid">
          {paste.title ? <h1>{paste.title}</h1> : <h1> </h1>}

          {!showMore && (
            <>
              <p className="paste-reduced">{paste.content}</p>
              <br />
            </>
          )}

          {showMore && (
            <>
              <p className="paste-complete">{paste.content}</p>
              <br />
            </>
          )}
        </div>
        <div className="ctn-paste-btns">
          <small className="paste-date-time">
            {paste.time.substring(0, 10)} {paste.time.substring(11, 16)}
          </small>
          <button className="del-btn" onClick={handleDeletePaste}>
            🗑️
          </button>
          <button
            className="comment-btn"
            onClick={() => handleViewPasteComments(paste.id)}
          >
            💬
          </button>
          {paste.content.length > 450 && !showMore && (
            <button className="comment-btn" onClick={() => setShowMore(true)}>
              🔽
            </button>
          )}
          {showMore && (
            <button className="comment-btn" onClick={() => setShowMore(false)}>
              🔼
            </button>
          )}
        </div>
      </div>
    </>
  );
}
