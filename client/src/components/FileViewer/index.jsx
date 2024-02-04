import React from 'react';

function FileViewer({ htmlContent }) {
  // Ensure that htmlContent is properly sanitized to prevent XSS attacks
  // This example directly renders the HTML, but in a real application,
  // consider using a library like DOMPurify to sanitize the content

  return (
    <div>
      <h2>Document Preview</h2>
      <div 
        className="file-viewer-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

export default FileViewer;