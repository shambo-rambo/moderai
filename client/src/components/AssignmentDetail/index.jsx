import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_ASSIGNMENT_DETAILS } from '../../utils/queries';

function AssignmentDetails() {
    const { assignmentID } = useParams();
    const { data, loading, error } = useQuery(FETCH_ASSIGNMENT_DETAILS, { variables: { id: assignmentID } });

    useEffect(() => {
        // Load assignment details when component mounts
    }, [assignmentID]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Check if data is available and has assignment details
    const assignment = data?.assignment;

    return (
        <div>
            <h2>Assignment Details</h2>
            {assignment ? (
                <div>
                    <h3>{assignment.title}</h3>
                    <p><strong>Instructions:</strong> {assignment.instructions}</p>
                    <p><strong>Subject Group:</strong> {assignment.subjectGroup}</p>
                    {/* ...any other details you want to display... */}
                </div>
            ) : (
                <p>Assignment details not found.</p>
            )}
        </div>
    );
}

export default AssignmentDetails;
