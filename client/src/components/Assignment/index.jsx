// Import necessary dependencies
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_ASSIGNMENT } from '../../utils/mutations';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Typography } from '@mui/material';

// Define the CombinedAssignment component
const CombinedAssignment = () => {
    // Initialize state for assignment details
    const [assignmentDetails, setAssignmentDetails] = useState({
        title: '',
        instructions: '',
        subjectGroup: '',
        markingCriteriaTitle: '',
        markingCriteriaDescription: ''
    });

    // Define mutation for adding an assignment
    const [addAssignment, { error }] = useMutation(ADD_ASSIGNMENT);
    // Get navigate function from react-router
    const navigate = useNavigate();

    // Handle input changes and update state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssignmentDetails({ ...assignmentDetails, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Prepare input for the addAssignment mutation
        const assignmentInput = {
            title: assignmentDetails.title,
            instructions: assignmentDetails.instructions,
            subjectGroup: assignmentDetails.subjectGroup,
            markingCriteriaInput: [{
                title: assignmentDetails.markingCriteriaTitle,
                description: assignmentDetails.markingCriteriaDescription
            }]
        };

        try {
            // Execute the addAssignment mutation
            const { data } = await addAssignment({
                variables: { input: assignmentInput },
            });

            // If the mutation was successful, navigate to the new assignment's page
            if (data.addAssignment._id) {
                navigate(`/StudentWork/${data.addAssignment._id}`);
            }

            // Reset the form fields
            setAssignmentDetails({
                title: '',
                instructions: '',
                subjectGroup: '',
                markingCriteriaTitle: '',
                markingCriteriaDescription: ''
            });
        } catch (err) {
            // Log any errors
            console.error('Error creating assignment:', err);
        }
    };

    // Render the form
    return (
        <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{
                backgroundColor: 'black', 
                padding: 2, 
                borderRadius: '4px',
                textAlign: 'center', 
                boxShadow: 3, 
                mb: 4
            }}>
                <Typography 
                    variant="h4" 
                    component="h3" 
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    gutterBottom
                >
                    Create Assignment & Marking Criteria
                </Typography>
            </Box>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    multiline
                    rows={2}
                    value={assignmentDetails.title}
                    onChange={handleInputChange}
                    placeholder="Assignment Title"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Instructions"
                    name="instructions"
                    multiline
                    rows={4}
                    value={assignmentDetails.instructions}
                    onChange={handleInputChange}
                    placeholder="Assignment Instructions"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Subject Group</InputLabel>
                    <Select
                        name="subjectGroup"
                        value={assignmentDetails.subjectGroup}
                        label="Subject Group"
                        onChange={handleInputChange}
                    >
                        <MenuItem value=""><em>Select Subject Group</em></MenuItem>
                        <MenuItem value="Language acquisition">Language acquisition</MenuItem>
                        <MenuItem value="Language and literature">Language and literature</MenuItem>
                        <MenuItem value="Individuals and societies">Individuals and societies</MenuItem>
                        <MenuItem value="Sciences">Sciences</MenuItem>
                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                        <MenuItem value="Arts">Arts</MenuItem>
                        <MenuItem value="Physical and health education">Physical and health education</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Marking Criteria Title"
                    name="markingCriteriaTitle"
                    multiline
                    rows={2}
                    value={assignmentDetails.markingCriteriaTitle}
                    onChange={handleInputChange}
                    placeholder="Marking Criteria Title"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Marking Criteria Description"
                    name="markingCriteriaDescription"
                    multiline
                    rows={2}
                    value={assignmentDetails.markingCriteriaDescription}
                    onChange={handleInputChange}
                    placeholder="Marking Criteria Description"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Assignment and Marking Criteria
                </Button>
            </Box>
            {error && <Typography color="error">Error submitting assignment</Typography>}
        </Box>
    );
};

export default CombinedAssignment;