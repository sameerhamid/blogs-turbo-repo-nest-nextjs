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
