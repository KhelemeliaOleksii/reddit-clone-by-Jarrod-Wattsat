/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $postOwner: String
  ) {
    onCreatePost(filter: $filter, postOwner: $postOwner) {
      id
      title
      content
      image
      upvotes
      downvotes
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          commentOwner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      postOwner
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $postOwner: String
  ) {
    onUpdatePost(filter: $filter, postOwner: $postOwner) {
      id
      title
      content
      image
      upvotes
      downvotes
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          commentOwner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      postOwner
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $postOwner: String
  ) {
    onDeletePost(filter: $filter, postOwner: $postOwner) {
      id
      title
      content
      image
      upvotes
      downvotes
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          commentOwner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      postOwner
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $commentOwner: String
  ) {
    onCreateComment(filter: $filter, commentOwner: $commentOwner) {
      id
      postID
      content
      createdAt
      updatedAt
      commentOwner
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $commentOwner: String
  ) {
    onUpdateComment(filter: $filter, commentOwner: $commentOwner) {
      id
      postID
      content
      createdAt
      updatedAt
      commentOwner
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $commentOwner: String
  ) {
    onDeleteComment(filter: $filter, commentOwner: $commentOwner) {
      id
      postID
      content
      createdAt
      updatedAt
      commentOwner
      __typename
    }
  }
`;
