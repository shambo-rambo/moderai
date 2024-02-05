// mutations.js
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ASSIGNMENT = gql`
  mutation addAssignment($input: AssignmentInput!) {
    addAssignment(input: $input) {
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

export const ADD_MARKINGCRITERIA = gql`
  mutation addMarkingCriteria($input: MarkingCriteriaInput!) {
    addMarkingCriteria(input: $input) {
      _id
      title
      description
      assignment
    }
  }
`;

export const SUBMIT_ESSAY = gql`
  mutation addEssay($input: EssayInput!) {
    addEssay(input: $input) {
      _id
      assignmentId {
        _id
      }
      text
    }
  }
`;

export const SUBMIT_COMMENT = gql`
  mutation addComment($essayId: ID!, $text: String!) {
    addComment(essayId: $essayId, text: $text) {
      _id
      text
      essayId
    }
  }
`;

