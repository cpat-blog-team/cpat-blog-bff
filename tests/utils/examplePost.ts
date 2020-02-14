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

export const exampleList = (numberOfPosts: number) => {
  const list: Post[] = [];

  for (let c = 0; c < numberOfPosts; c++) {
    list.push(examplePost);
  }

  return list;
};
