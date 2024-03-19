export type TPost = {
	id: string;
	image: string;
	likes: number;
	publishDate: string;
	text: string;
	tags: string[];
	owner: {
		id: string;
		picture: string;
		firstName: string;
		lastName: string;
		title: string;
	};
};
