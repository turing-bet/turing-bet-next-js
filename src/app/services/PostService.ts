import { Post } from "../model/post";

class PostService {
  async getContextPosts(): Promise<Post[]> {
    const contextPosts: Post[] = [];
    let userAnswers: string[] = [];

    return contextPosts;
  }

  async setupRandomPost(): Promise<Post> {
    const randomPost: Post = {
      roundId: "",
      text: "",
      isGenerated: false,
    };
    return randomPost;
  }

  async getCanidatePosts(): Promise<Post[]> {
    const canidatePosts: Post[] = [];
    return canidatePosts;
  }
}

export default new PostService();
