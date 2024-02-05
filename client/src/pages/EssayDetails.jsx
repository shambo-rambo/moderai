import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_ESSAY_DETAILS } from '../utils/queries';
import CommentBox from '../components/CommentBox/Index';
import { Box, Typography, CircularProgress } from '@mui/material';

function EssayDetails() {
    const { essayID } = useParams(); 
    const { loading, error, data } = useQuery(FETCH_ESSAY_DETAILS, {
        variables: { id: essayID }, 
    });

    useEffect(() => {}, [essayID]);
    
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;
    
    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h3" gutterBottom>
                Essay Details
            </Typography>
            {data?.essay ? (
                <Box sx={(theme) => ({
                    border: `2px solid ${theme.palette.primary.main}`, 
                    padding: 2, 
                    borderRadius: '4px', 
                    marginTop: 2
                })}>
                    <Typography variant="h5" gutterBottom>
                        Essay Text
                    </Typography>
                    <Typography variant="body1">{data.essay.text}</Typography>
                </Box>
            ) : (
                <Typography>Essay details not found.</Typography>
            )}
            <CommentBox essayId={essayID} />
        </Box>
    );
}

export default EssayDetails;
