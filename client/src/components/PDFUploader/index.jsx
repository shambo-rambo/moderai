import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setError(null); // Clear any previous errors
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Check if the selected file is a PDF
        if (file && file.type !== 'application/pdf') {
            setError('Please select a valid PDF file.');
            setNumPages(null); // Clear numPages
        } else {
            setError(null); // Clear any previous errors
        }
    };

        return (
            <div>
                <input type="file" onChange={handleFileChange} accept="application/pdf" />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {selectedFile && (
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
                )}
            </div>
        );
        }

export default PDFUploader;
