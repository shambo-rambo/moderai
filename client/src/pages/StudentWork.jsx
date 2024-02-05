import React from 'react';
import { useParams } from 'react-router-dom';
import AssignmentDetail from '../components/AssignmentDetail';
import EssaySubmission from '../components/EssaySubmission/Index'; 

function StudentWork() {
  const { assignmentID } = useParams(); // This retrieves the assignment ID from the URL

  return (
    <div>
      {/* Display the assignment details */}
      <AssignmentDetail assignmentID={assignmentID} />
      {/* The EssaySubmission component now handles essay uploads and submissions */}
      <EssaySubmission assignmentId={assignmentID} />
    </div>
  );
}

export default StudentWork;
