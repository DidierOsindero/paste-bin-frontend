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
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // that will stop page from refreshing
    await axios.post(baseUrl + "/pastes/" + pasteId + "/comments", {
      comment: commentInput,
    });
    await getComments();
    setCommentInput("");
    //no going back to paste view but same page with new comment
  };
  const getComments = async () => {
    const { data } = await axios.get(
      baseUrl + "/pastes/" + pasteId + "/comments"
    );
    setRecentComments(data);
  };
  const handleDeleteComment = async (commentId: string) => {
    await axios.delete(
      baseUrl + "/pastes/" + pasteId + "/comments/" + commentId
    );
    await getComments();
    console.log(typeof commentId);
  };
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
      <form onSubmit={(e) => handleSubmitComment(e)}>
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
          value="+"
          disabled={commentInput.trim() === ""}
        />
      </form>
      <h2>Recent Comments</h2>
      <div className="ctn-recent-comments">
        {recentComments.map((comment) => {
          return (
            <div key={comment.id}>
              <p className="text-comment">
                ???? {comment.comment}
                {" - "}
                <span>
                  <small className="date-time">
                    {comment.time.substring(0, 10)}{" "}
                    {comment.time.substring(11, 16)}
                  </small>
                </span>
              </p>
              <button
                className="del-btn-comment"
                onClick={() => handleDeleteComment(comment.id)}
              >
                {" "}
                ???????
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
