// src/pages/EssayDetails.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_ESSAY_DETAILS } from '../utils/queries';
import CommentBox from '../components/CommentBox/Index';


function EssayDetails() {
    const { essayID } = useParams(); 
    const { loading, error, data } = useQuery(FETCH_ESSAY_DETAILS, {
        variables: { id: essayID }, 
    });

    useEffect(() => {}, [essayID]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <h2>Essay Details</h2>
            {data?.essay ? (
                <div>
                    <h3>Essay Text</h3>
                    <p>{data.essay.text}</p>
                </div>
            ) : (
                <p>Essay details not found.</p>
            )}
            <CommentBox essayId={essayID} />
        </div>
    );
}

export default EssayDetails;
