import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      id
      image
      created_at
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`
export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId (post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`

export const GET_POST_BY_POST_ID = gql`
query MyQuery($post_id: ID!) {
  getPostListByPostId(post_id: $post_id) {
      body
      id
      image
      created_at
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  
}
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic (topic: $topic) {
      body
      id
      image
      created_at
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        text
        username
        created_at
        id
        post_id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_SUBREDDITS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
