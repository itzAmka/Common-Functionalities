export type TUser = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	phone: string;
	username: string;
	image: string;
	company: {
		name: string;
		title: string;
		department: string;
	};
};

export type TFilteredUser = {
	user: TUser;
	searchTerms: string;
};
