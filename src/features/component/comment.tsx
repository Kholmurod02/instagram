import React, { useState } from "react";
import { useAddCommentMutation } from "../../entities/post/postApi";

interface CommentProps {
  postId: string;
  initialComments: string[];
}

const Comment: React.FC<CommentProps> = ({ postId, initialComments }) => {
  const [commentText, setCommentText] = useState("");
  const [addComment] = useAddCommentMutation();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = async () => {
    if (commentText.trim()) {
      try {
        await addComment({ postId, comment: commentText });
        setCommentText(""); // Clear input field after submission
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="p-2 rounded-md w-full"
          />
          <button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Comment
          </button>
        </div>

        <div className="space-y-2 mt-4">
          {initialComments.map((comment, index) => (
            <div key={index} className="text-sm text-gray-700">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
