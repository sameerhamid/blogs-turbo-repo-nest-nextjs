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

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      author {
        id
        name
        email
        bio
        avatar
      }
      createdAt
      updatedAt
    }
    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      content

      createdAt
      updatedAt
    }
  }
`;

export const POST_LIKES_COUNT = gql`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
  }
`;

export const USER_LIKED_POST = gql`
  query PostLikeData($postId: Int!) {
    userLikedPost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;

export const GET_USER_POSTS = gql`
  query getUserPosts($skip: Float, $take: Float) {
    getUserPosts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      content
      published
      createdAt

      _count {
        comments
        likes
      }
    }
    userPostsCount
  }
`;
