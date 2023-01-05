import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";

interface CommentViewProps {
  pasteId: string;
}

interface CommentData {
  comment: string;
  id: string;
  time: string;
}

export function CommentView({ pasteId }: CommentViewProps): JSX.Element {
  const [commentInput, setCommentInput] = useState<string>("");
  const [recentComments, setRecentComments] = useState<CommentData[]>([]);
  const handleSubmitComment = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault() // that will stop page from refreshing
    await axios.post(baseUrl + "/pastes/"+ pasteId + "/comments", {comment: commentInput})
    await getComments()
    setCommentInput("")
    //no going back to paste view but same page with new comment 
  }
  const getComments= async() =>{
    const {data} = await axios.get(baseUrl + "/pastes/" + pasteId+ "/comments")
    setRecentComments(data)
  }
  // const handleDeleteComment = () =>{
  //   axios.delete(baseUrl + "/pastes/"+ )
  // }
  useEffect(() => {
    const getRecentComments = async () => {
      const { data } = await axios.get(
        baseUrl + "/pastes/" + pasteId + "/comments"
      );
      setRecentComments(data);
    };
    getRecentComments();
  }, [pasteId]);

  return (
    <div className="ctn-comment-view">
      <form onSubmit = {(e)=>handleSubmitComment(e)}>
        <textarea
          className="comment-input"
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write your comment..."
          required
          value={commentInput}
        ></textarea>
        <br />
        <input
          className="submit-comment"
          type="submit"
          value="submit"
          disabled={commentInput.trim() === ""}
        />
      </form>
      <h2>Recent Comments</h2>
      <div className="ctn-recent-comments">
        {recentComments.map((comment) => {
          return (
            <p key={comment.id}>
              <h3>{comment.id}</h3>
              <p>{comment.comment} </p>
              <button>🗑️</button>
              <span>
                Date: {comment.time.substring(0, 10)}, Time:{" "}
                {comment.time.substring(11, 16)}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
