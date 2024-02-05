import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_ASSIGNMENT_DETAILS } from '../../utils/queries';
import { Box, Typography, TextField, CircularProgress } from '@mui/material';

function AssignmentDetails() {
    const { assignmentID } = useParams();
    const { data, loading, error } = useQuery(FETCH_ASSIGNMENT_DETAILS, { variables: { id: assignmentID } });

    useEffect(() => {
    }, [assignmentID]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    const assignment = data?.assignment;

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h3" gutterBottom>
                Assignment Details
            </Typography>
            {assignment ? (
                <Box>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        value={assignment.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        rows={2}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Instructions"
                        value={assignment.instructions}
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        rows={2}
                    />
                    {/* If you have other details like subject group, add them here */}
                </Box>
            ) : (
                <Typography>
                    Assignment details not found.
                </Typography>
            )}
        </Box>
    );
}

export default AssignmentDetails;
