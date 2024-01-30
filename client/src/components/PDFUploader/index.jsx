import React, { useState } from 'react';
import { Document, Page } from '@react-pdf/renderer';

function PDFUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="application/pdf" />
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
