// CommentBox.js
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_COMMENTS } from '../../utils/queries';
import { SUBMIT_COMMENT } from '../../utils/mutations';

const CommentBox = ({ assignmentId }) => {
    const [commentText, setCommentText] = useState('');
    const { data, loading, error } = useQuery(FETCH_COMMENTS, {
        variables: { assignmentId },
    });
    const [submitComment] = useMutation(SUBMIT_COMMENT);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        await submitComment({
            variables: {
                assignmentId,
                text: commentText,
            },
        });
        setCommentText(''); // Reset input field after submission
        // Optionally, refetch comments here if your query doesn't auto-update
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error.message}</p>;

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Submit Comment</button>
            </form>
            <div>
                <h3>Comments</h3>
                {data.comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        {/* Display more comment details here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentBox;
