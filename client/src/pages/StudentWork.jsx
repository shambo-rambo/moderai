import React from 'react';
import { useParams } from 'react-router-dom';
import AssignmentDetail from '../components/AssignmentDetail';
import EssaySubmission from '../components/EssaySubmission/Index'; // Import the EssaySubmission component

function StudentWork() {
  const { assignmentID } = useParams(); // This retrieves the assignment ID from the URL

  return (
    <div>
      <h1>Assignment Details</h1>
      {/* Display the assignment details */}
      <AssignmentDetail assignmentID={assignmentID} />

      <h2>Submit Your Essay</h2>
      {/* The EssaySubmission component now handles essay uploads and submissions */}
      <EssaySubmission assignmentId={assignmentID} />
    </div>
  );
}

export default StudentWork;
