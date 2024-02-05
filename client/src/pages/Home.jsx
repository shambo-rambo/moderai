import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Essay Grading Assistant App
            </Typography>
            <Typography variant="body1">
                Empowering Educators with AI-Powered Student Assessment
            </Typography>
            <Typography variant="body1">
                Efficiency, Accuracy, and Support for Teachers
            </Typography>
            <Typography variant="body1">
                Experience a revolutionary approach to grading and providing feedback on student work with the Essay Grading Assistant App. Our advanced AI technology streamlines the assessment process, giving educators more time to focus on teaching while ensuring fair and insightful evaluations.
            </Typography>
            <Typography variant="body1">
                Key Features:
            </Typography>
            <ul>
                <li><strong>Upload Student Work:</strong> Easily upload essays, assignments, and projects submitted by your students.</li>
                <li><strong>AI Assessment:</strong> Our cutting-edge AI analyzes student work, providing objective evaluation and grading.</li>
                <li><strong>Customized Comments:</strong> Generate personalized comments for each student, offering constructive feedback to aid their development.</li>
                <li><strong>Efficiency Boost:</strong> Save hours of grading time, allowing you to dedicate more attention to teaching and mentoring.</li>
                <li><strong>AI Moderation:</strong> Ensure fairness and consistency in grading with AI acting as a reliable moderator.</li>
            </ul>
            <Typography variant="body1">
                Join educators worldwide who have embraced the future of assessment with the Essay Grading Assistant App. Empower your teaching journey and improve student learning outcomes today!
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to="/signup">
                Get Started
            </Button>
        </Box>
    );
}

export default Home;
