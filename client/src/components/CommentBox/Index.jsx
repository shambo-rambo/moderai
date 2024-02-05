import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { FETCH_COMMENTS } from '../../utils/queries'; 
import { SUBMIT_COMMENT } from '../../utils/mutations';

const CommentBox = () => { 
    const { essayID } = useParams(); 
    const [commentText, setCommentText] = useState('');
    const { data, loading, error } = useQuery(FETCH_COMMENTS, {
        variables: { essayId: essayID },
    });
    const [addComment] = useMutation(SUBMIT_COMMENT);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        await addComment({
            variables: {
                essayId: essayID,
                text: commentText,
            },
        });
        setCommentText(''); 
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error.message}</p>;

    const comments = data?.commentsByEssay || [];

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
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentBox;
