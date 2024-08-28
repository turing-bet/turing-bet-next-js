import { Post } from "../model/post";

class PostService {
  async setupRandomPost(): Promise<Post> {
    const randomPost: Post = {
      roundId: "",
      text: "This is a random post",
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
