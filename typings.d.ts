type Comments = {
    created_at: string;
    id: string;
    post_id: string;
    text: string;
    username: string;
}
type Vote = {
    created_at: string;
    id: string;
    post_id: string;
    upvote: boolean;
    username: string;
}
type Subreddit = {
    created_at: string;
    id: string;
    topic: string;
}
type Post = {
    body: string;
    created_at: string;
    id: number;
    image: string;
    subreddit_id: string;
    title: string;
    username: string;
    votes: Vote[];
    comments: Comments[];
    subreddit: Subreddit[];
}
