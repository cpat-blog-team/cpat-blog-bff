interface Post {
  username: string;
  userId: string;
  title: string;
  summary: string;
  content: string;
  version: number;
};

export const examplePost: Post = {
  userId: '1',
  username: 'bob',
  title: 'bobs blog',
  summary: 'bobs summary',
  content: 'bobs content',
  version: 1
};
