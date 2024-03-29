import React, { useState } from 'react';
import mammoth from 'mammoth';
import FileViewer from '../FileViewer'; // Ensure this is the correct path to your FileViewer component
import { useMutation } from '@apollo/client';
import { SUBMIT_ESSAY } from '../../utils/mutations'; // Update this path to match your project structure
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, Input } from '@mui/material';

const EssaySubmission = ({ assignmentId }) => {
    const [docHtml, setDocHtml] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [feedback, setFeedback] = useState(''); // State to store OpenAI feedback
    const [submitting, setSubmitting] = useState(false); // State to manage submission status

    const [submitEssay, { error }] = useMutation(SUBMIT_ESSAY);
    const navigate = useNavigate();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            setUploadError('No file selected.');
            return;
        }

        setSubmitting(true); // Indicate file processing is underway
        try {
            // Use mammoth to extract text from the uploaded .docx file
            const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
            setDocHtml(result.value); // Store the extracted text for display and submission
            setUploadError(''); // Clear any previous errors upon successful processing
        } catch (error) {
            console.error('Error processing the file:', error);
            setUploadError('Failed to process the file.');
        } finally {
            setSubmitting(false); // Processing complete
        }
    };

    const handleSubmitEssay = async () => {
        if (!docHtml) {
            setUploadError('No document content to submit.');
            return;
        }

        setSubmitting(true);
        try {
            const essayInput = {
                assignmentId,
                text: docHtml,
            };

            console.log('Submitting the following input to the submitEssay mutation:', essayInput);

            const { data } = await submitEssay({
                variables: { input: essayInput },
            });

            console.log('Received the following response from the submitEssay mutation:', data);

            if (!data.addEssay._id) throw new Error('Failed to save essay');

            setFeedback('');

            navigate(`/essaydetails/${data.addEssay._id}`);

        } catch (error) {
            console.error('Error during submission:', error);
            setUploadError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', paddingTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h3" gutterBottom>
                Submit Essay
            </Typography>
            <Input
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                disabled={submitting}
                sx={{ marginBottom: 2 }}
            />
            {uploadError && <Typography color="error">{uploadError}</Typography>}
            {docHtml && (
                <Box sx={(theme) => ({
                    border: `2px solid ${theme.palette.primary.main}`, 
                    padding: 2, 
                    borderRadius: '4px', 
                    marginTop: 2
                })}>
                    <FileViewer htmlContent={docHtml} />
                </Box>
            )}
            {docHtml && !submitting && (
                <Button variant="contained" color="primary" onClick={handleSubmitEssay} disabled={submitting} sx={{ mt: 2 }}>
                    Submit Essay
                </Button>
            )}
            {feedback && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Feedback</Typography>
                    <Typography>{feedback}</Typography>
                </Box>
            )}
            {submitting && <CircularProgress />}
        </Box>
    );
};

export default EssaySubmission;