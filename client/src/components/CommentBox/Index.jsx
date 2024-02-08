import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_COMMENTS, DELETE_COMMENT, EDIT_COMMENT } from '../../utils/queries';
import { SUBMIT_COMMENT } from '../../utils/mutations';
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

const CommentBox = () => {
    const { essayID } = useParams(); 
    const [commentText, setCommentText] = useState('');
    const { data, loading, error } = useQuery(FETCH_COMMENTS, {
        variables: { essayId: essayID },
    });
    const [addComment, { loading: addingComment }] = useMutation(SUBMIT_COMMENT, {
        refetchQueries: [{ query: FETCH_COMMENTS, variables: { essayId: essayID } }],
    });

    // Mutations for deleting and editing comments
    const [deleteComment] = useMutation(DELETE_COMMENT, {
        refetchQueries: [{ query: FETCH_COMMENTS, variables: { essayId: essayID } }],
    });
    const [editComment] = useMutation(EDIT_COMMENT, {
        refetchQueries: [{ query: FETCH_COMMENTS, variables: { essayId: essayID } }],
    });

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState('');

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

    const handleDelete = async (commentId) => {
        await deleteComment({ variables: { commentId } });
    };

    const handleEdit = async (commentId, newText) => {
        await editComment({
            variables: {
                commentId,
                text: newText,
            },
        });
    };
    
    const startEdit = (comment) => {
        setEditingCommentId(comment._id);
        setEditingText(comment.text);
    };

    const handleEditSubmit = async () => {
        await handleEdit(editingCommentId, editingText);
        setEditingCommentId(null);
        setEditingText('');
    };

    const handleEditChange = (e) => {
        setEditingText(e.target.value);
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
            </Box>            
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Drag Comments Where Appropriate</Typography>
                {comments.map((comment) => {
                    return (
                        <Draggable>
                            <Box 
                                key={comment._id} 
                                sx={(theme) => ({
                                    border: `1px solid ${theme.palette.primary.main}`, 
                                    p: 2, 
                                    borderRadius: '4px', 
                                    mt: 1,
                                    position: 'relative',
                                    display: 'inline-block',
                                    backgroundColor: 'rgba(255, 255, 0, 0.2)' // 50% transparent lime green

                                })}
                            >
                                {editingCommentId === comment._id ? (
                                    <React.Fragment>
                                        <TextField
                                            fullWidth
                                            multiline
                                            value={editingText}
                                            onChange={handleEditChange}
                                        />
                                        <Button onClick={handleEditSubmit} color="primary">
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditingCommentId(null)} color="secondary">
                                            Cancel
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Box sx={{ pr: 8 }}> 
                                            <Typography>{comment.text}</Typography>
                                        </Box>
                                        <IconButton onClick={() => startEdit(comment)} sx={{ color: 'orange', position: 'absolute', top: '5px', right: '40px' }}>
                                            <EditIcon />
                                        </IconButton>
                                    </React.Fragment>
                                )}
                                <IconButton onClick={() => handleDelete(comment._id)} sx={{ color: 'red', position: 'absolute', top: '5px', right: '5px' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Draggable>
                    );
                })}
            </Box>
        </Box>
    );
};

export default CommentBox;

