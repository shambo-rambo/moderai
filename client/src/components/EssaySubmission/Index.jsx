import React, { useState } from 'react';
import mammoth from 'mammoth';
import FileViewer from '../FileViewer'; // Assuming FileViewer is for previewing the text

const EssaySubmission = ({ assignmentId }) => {
    const [docHtml, setDocHtml] = useState('');
    const [uploadError, setUploadError] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            setUploadError('No file selected.');
            return;
        }

        try {
            const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
            setDocHtml(result.value);
            setUploadError(''); // Clear any previous error
        } catch (error) {
            console.error('Error processing the file', error);
            setUploadError('Failed to process the file.');
        }
    };

    const handleSubmitEssay = async () => {
        // Here, include logic to submit `docHtml` to MongoDB and make an API call to OpenAI as needed.
        console.log('Submitting essay:', docHtml);
        // Submit logic goes here
    };

    return (
        <div>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
            {docHtml && (
                <>
                    <FileViewer htmlContent={docHtml} />
                    <button onClick={handleSubmitEssay}>Submit Essay</button>
                </>
            )}
        </div>
    );
};

export default EssaySubmission;
