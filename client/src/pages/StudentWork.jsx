import React from 'react';
import { useParams } from 'react-router-dom';
import AssignmentDetail from '../components/AssignmentDetail';
import PDFUploader from '../components/PDFUploader';

function StudentWork() {
    const { assignmentID } = useParams();

    return (
        <div>
            <h1>Assignment Detail</h1>
            <AssignmentDetail assignmentID={assignmentID} />
            <h2>Upload Student Work</h2>
            <PDFUploader assignmentID={assignmentID} />
        </div>
    );
}

export default StudentWork;
