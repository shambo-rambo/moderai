// MarkingCriteria component
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MARKINGCRITERIA } from '../../utils/mutations';

function MarkingCriteria() {
    const [markingCriteria, setMarkingCriteria] = useState({
        title: '',
        description: ''
    });
    const [addMarkingCriteria, { error }] = useMutation(ADD_MARKINGCRITERIA);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMarkingCriteria({ ...markingCriteria, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { data } = await addMarkingCriteria({
                variables: { input: markingCriteria },
            });
    
            console.log(data);
            setMarkingCriteria({ title: '', description: '' });
        } catch (err) {
            console.error('Error creating marking criteria:', err);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                name="title"
                value={markingCriteria.title}
                onChange={handleInputChange}
                type="text"
                placeholder="Title"
            />
            <input
                name="description"
                value={markingCriteria.description}
                onChange={handleInputChange}
                type="text"
                placeholder="Description"
            />
            <button type="submit">Add Marking Criteria</button>
        </form>
    );
}

export default MarkingCriteria;