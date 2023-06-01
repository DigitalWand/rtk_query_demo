interface Posts {
  [key: string]: any;
  id?: string;
  title: string;
  body: string;
}

interface PostsSlice {
  isCreatePostModalVisible: boolean;
  isUpdatePostModalVisible: boolean;
  post: Posts;
}

export { Posts, PostsSlice };
