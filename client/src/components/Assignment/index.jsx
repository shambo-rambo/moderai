import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ASSIGNMENT } from '../../utils/mutations';

function Assignment() {
    const [assignment, setAssignment] = useState({
        title: '',
        instructions: '',
    });
    const [addAssignment, { error }] = useMutation(ADD_ASSIGNMENT);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssignment({ ...assignment, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { data } = await addAssignment({
                variables: { input: assignment },
            });
    
            console.log(data);
    
            setAssignment({
                title: '',
                instructions: '',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Create Assignment</h3>
            <form className="flex-row justify-center justify-space-between-md align-stretch">
                <input
                    placeholder="Title"
                    name="title"
                    type="text"
                    value={assignment.title}
                    className="form-input col-12 col-md-9"
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="Instructions"
                    name="instructions"
                    type="text"
                    value={assignment.instructions}
                    className="form-input col-12 col-md-9"
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-primary btn-block py-3"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    onClick={handleFormSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Assignment;
