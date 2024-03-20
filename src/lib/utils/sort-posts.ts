import type { TPost } from '$lib/types/posts';

export const sortByDateAsc = (posts: TPost[]) => {
	return posts.toSorted(
		(a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
	);
};

export const sortByDateDesc = (posts: TPost[]) => {
	return posts.toSorted(
		(a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
	);
};

export const sortPosts = (posts: TPost[], dateOrder: 'asc' | 'desc'): TPost[] => {
	let sortedPosts = posts;

	if (dateOrder === 'asc') {
		sortedPosts = sortByDateAsc(sortedPosts);
	} else if (dateOrder === 'desc') {
		sortedPosts = sortByDateDesc(sortedPosts);
	}

	return sortedPosts;
};
