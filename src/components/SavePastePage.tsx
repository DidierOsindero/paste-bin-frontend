import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

interface INewPaste {
  title: string;
  content: string;
}

export function SavePaste(): JSX.Element {
  const [pasteData, setPasteData] = useState<INewPaste>({
    title: "",
    content: "",
  });
  const updatePasteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasteData((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const updatePasteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPasteData((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  const handleSubmit = () => {
    axios.post(baseUrl + "/pastes", pasteData);
  };
  return (
    <div className="ctn-save-pastes-page">
      <form onSubmit={handleSubmit}>
        <input
          className="title-input"
          onChange={updatePasteTitle}
          placeholder="Write your title"
          value={pasteData.title}
        />
        <textarea
          className="content-input"
          required
          onChange={updatePasteContent}
          placeholder="Write your content"
          value={pasteData.content}
        />
        <input
          className="input-submit"
          type="submit"
          value="submit"
          disabled={pasteData.content.trim() === ""}
        />
      </form>
    </div>
  );
}
