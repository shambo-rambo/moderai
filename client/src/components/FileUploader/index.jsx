// // FileUploader.jsx
// import React, { useState } from 'react';
// import mammoth from 'mammoth';

// function FileUploader({ onFileProcessed }) {
//   const [uploadError, setUploadError] = useState('');

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       return;
//     }

//     try {
//       const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
//       onFileProcessed(result.value); // Pass the converted HTML to the parent component
//       setUploadError(''); // Clear any previous error
//     } catch (error) {
//       console.error('Error processing the file', error);
//       setUploadError('Failed to process the file.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".docx" onChange={handleFileChange} />
//       {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
//     </div>
//   );
// }

// export default FileUploader;
