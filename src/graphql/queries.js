import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    me {
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
      role
      isVerified
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    messages(order_by: { timestamp: asc }) {
      id
      user_name
      message
      timestamp
      avatar
    }
  }
`;

export const GET_EXCHANGE_RATES = gql`
  query {
    get_exchange_rates {
      base
      rates {
        currency
        rate
      }
    }
  }
`;
