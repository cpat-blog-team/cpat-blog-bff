<<<<<<< HEAD
import Delta from 'quill-delta';

interface Post {
	name: string;
	email: string;
	title: string;
	summary: string;
	content: string;
	version: number;
	date: string;
}

export const examplePost: Post = {
	email: 'bob@bob.com',
	name: 'bob',
	title: 'bobs blog',
	summary: 'bobs summary',
	content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
	version: 1,
	date: new Date().toDateString()
};

const numberedPost = (number: number) => ({
	email: 'bob@bob.com',
	name: 'bob',
	title: `bobs blog ${number}`,
	summary: 'bobs summary',
	content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
	version: 1,
	date: new Date().toDateString()
=======
import Delta from 'quill-delta'
  ;
interface Post {
  name: string;
  email: string;
  title: string;
  summary: string;
  content: string;
  version: number;
  date: string
};

export const examplePost: Post = {
  email: 'bob@bob.com',
  name: 'bob',
  title: 'bobs blog',
  summary: 'bobs summary',
  content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
  version: 1,
  date: new Date().toDateString()
};

const numberedPost = (number: number) => ({
  email: 'bob@bob.com',
  name: 'bob',
  title: `bobs blog ${number}`,
  summary: 'bobs summary',
  content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
  version: 1,
  date: new Date().toDateString()
>>>>>>> master
});

export const exampleList = (numberOfPosts: number) => {
	const list: Post[] = [];

<<<<<<< HEAD
	for (let c = 0; c < numberOfPosts; c++) {
		list.push(numberedPost(c));
	}
=======
  for (let c = 0; c < numberOfPosts; c++) {
    list.push(numberedPost(c));
  }
>>>>>>> master

	return list;
};
