import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(input: { name: $name, email: $email, password: $password }) {
      token
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile($input: UpdateProfileInput) {
    updateProfile(input: $input) {
      id
      name
      email
      profilePicture
      bio
      address
      phone
      socialLinks {
        twitter
        linkedin
        facebook
        instagram
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

//Mutations to hasura
export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $userName: String!
    $message: String!
    $timestamp: String!
    $avatar: String!
  ) {
    insert_messages_one(
      object: {
        user_name: $userName
        message: $message
        timestamp: $timestamp
        avatar: $avatar
      }
    ) {
      id
      user_name
      message
      timestamp
      avatar
    }
  }
`;
