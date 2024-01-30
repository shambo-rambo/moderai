import React, { useState } from 'react';
import { useMutation, } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_ASSIGNMENT } from '../../utils/mutations';

const CombinedAssignment = () => {
    const [assignmentDetails, setAssignmentDetails] = useState({
        title: '',
        instructions: '',
        subjectGroup: '',
        markingCriteriaTitle: '',
        markingCriteriaDescription: ''
    });

    const [addAssignment, { error }] = useMutation(ADD_ASSIGNMENT);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssignmentDetails({ ...assignmentDetails, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const assignmentInput = {
            title: assignmentDetails.title,
            instructions: assignmentDetails.instructions,
            subjectGroup: assignmentDetails.subjectGroup,
            markingCriteriaInput: [{
                title: assignmentDetails.markingCriteriaTitle,
                description: assignmentDetails.markingCriteriaDescription
            }]
        };
    
        try {
            const { data } = await addAssignment({
                variables: { input: assignmentInput },
            });
    
            if (data.addAssignment._id) {
                // Navigate to the assignment detail page using the assignment ID
                navigate(`/StudentWork/${data.addAssignment._id}`);
            }
    
            setAssignmentDetails({
                title: '',
                instructions: '',
                subjectGroup: '',
                markingCriteriaTitle: '',
                markingCriteriaDescription: ''
            });
        } catch (err) {
            console.error('Error creating assignment:', err);
        }
    };    

    return (
        <div>
            <h3>Create Assignment with Marking Criteria</h3>
            <form onSubmit={handleFormSubmit}>
                {/* Assignment input fields */}
                <div>
                    <label>Title:</label>
                    <input
                        name="title"
                        type="text"
                        value={assignmentDetails.title}
                        onChange={handleInputChange}
                        placeholder="Assignment Title"
                    />
                </div>

                <div>
                    <label>Instructions:</label>
                    <textarea
                        name="instructions"
                        value={assignmentDetails.instructions}
                        onChange={handleInputChange}
                        placeholder="Assignment Instructions"
                    />
                </div>

                <div>
                    <label>Subject Group:</label>
                    <select
                        name="subjectGroup"
                        value={assignmentDetails.subjectGroup}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Subject Group</option>
                        <option value="Language acquisition">Language acquisition</option>
                        <option value="Language and literature">Language and literature</option>
                        <option value="Individuals and societies">Individuals and societies</option>
                        <option value="Sciences">Sciences</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Arts">Arts</option>
                        <option value="Physical and health education">Physical and health education</option>
                        <option value="Design">Design</option>
                    </select>
                </div>

                {/* Marking Criteria input fields */}
                <div>
                    <label>Marking Criteria Title:</label>
                    <input
                        name="markingCriteriaTitle"
                        type="text"
                        value={assignmentDetails.markingCriteriaTitle}
                        onChange={handleInputChange}
                        placeholder="Marking Criteria Title"
                    />
                </div>
                <div>
                    <label>Marking Criteria Description:</label>
                    <input
                        name="markingCriteriaDescription"
                        value={assignmentDetails.markingCriteriaDescription}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Marking Criteria Description"
                    />
                </div>

                <button type="submit">Create Assignment and Marking Criteria</button>
            </form>
            {error && <div>Error submitting assignment</div>}
        </div>
    );
};

export default CombinedAssignment;
