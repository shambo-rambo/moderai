import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        firstName
        lastName
        email
        }
    }
    `;

    export const FETCH_ASSIGNMENT_DETAILS = gql`
    query FetchAssignmentDetails($id: ID!) {
        assignment(_id: $id) {
            _id
            title
            instructions
            subjectGroup
            markingCriteria {
                _id
                title
                description
            }
        }
    }
`;

export const FETCH_ESSAY_DETAILS = gql`
    query FetchEssayDetails($id: ID!) {
        essay(_id: $id) {
            _id
            text
        }
    }
`;

export const FETCH_COMMENTS = gql`
    query FetchComments($essayId: ID!) {
        commentsByEssay(essayId: $essayId) {
            _id
            text
            essayId
            userId {
                _id
            }
        }
    }
`;