import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { FETCH_COMMENTS } from '../../utils/queries'; 
import { SUBMIT_COMMENT } from '../../utils/mutations';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const CommentBox = () => { 
    const { essayID } = useParams(); 
    const [commentText, setCommentText] = useState('');
    const { data, loading, error } = useQuery(FETCH_COMMENTS, {
        variables: { essayId: essayID },
    });
    const [addComment, { loading: addingComment }] = useMutation(SUBMIT_COMMENT, {
        refetchQueries: [{ query: FETCH_COMMENTS, variables: { essayId: essayID } }],
    });
    
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

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading comments: {error.message}</Typography>;

    const comments = data?.commentsByEssay || [];
    
        return (
            <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 2 }}>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleCommentSubmit} sx={{ width: '100%' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit Comment</Button>
            </Box>                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Comments</Typography>
                    {comments.map((comment) => {
                        let commentText = comment.text;
                        if (comment.isAI) {
                            try {
                                const aiComment = JSON.parse(comment.text);
                                commentText = aiComment.feedback || "AI-generated comment without feedback.";
                            } catch (error) {
                                console.error("Error parsing AI-generated comment:", error);
                                commentText = "Error displaying this AI-generated comment.";
                            }
                        }

                        return (
                            <Box key={comment._id} sx={(theme) => ({
                                border: `1px solid ${theme.palette.primary.main}`, 
                                p: 2, 
                                borderRadius: '4px', 
                                mt: 1 
                            })}>
                                <Typography>{commentText}</Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        );
    };

export default CommentBox;
