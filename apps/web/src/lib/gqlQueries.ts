import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    # ✅ Add space after commas
    posts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      content
      published
      createdAt
      updatedAt
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      slug
      thumbnail
      content
      published
      createdAt
      updatedAt
      author {
        id
        name
        email
        bio
        avatar
      }
      tags {
        id
        name
      }
      comments {
        id
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      bio
      avatar
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation signIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      id
      name
      avatar
      email
      accessToken
    }
  }
`;
