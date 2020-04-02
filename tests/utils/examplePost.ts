import Delta from 'quill-delta';

interface Post {
	email: string;
	title: string;
	summary: string;
	content: string;
	version: number;
	date: string;
}

export const examplePost: Post = {
	_id: '5e862cbb840e0c981fe08b50',
	email: 'bob',
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
});

export const exampleList = (numberOfPosts: number) => {
	const list: Post[] = [];

	for (let c = 0; c < numberOfPosts; c++) {
		list.push(numberedPost(c));
	}

	return list;
};
