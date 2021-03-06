import Delta from 'quill-delta';
import { IBlog, ApprovalStatus } from '../../src/models/Blog';

export const examplePost: IBlog = {
	email: 'bob@bob.com',
	name: 'bob',
	title: 'bobs blog',
	summary: 'bobs summary',
	content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
	version: 1,
	date: new Date().toDateString(),
	approved: ApprovalStatus.Approved,
	review: '',
	filename: ''
};

const numberedPost = (number: number) => ({
	email: 'bob@bob.com',
	name: 'bob',
	title: `bobs blog ${number}`,
	summary: 'bobs summary',
	content: JSON.stringify(new Delta([{ insert: 'bobs content' }])),
	version: 1,
	date: new Date().toDateString(),
	approved: ApprovalStatus.Approved,
	review: '',
	filename: ''
});

export const exampleList = (numberOfPosts: number) => {
	const list: IBlog[] = [];

	for (let c = 0; c < numberOfPosts; c++) {
		list.push(numberedPost(c));
	}

	return list;
};
