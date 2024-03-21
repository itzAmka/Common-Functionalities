import type { TFilteredUser, TUser } from '../types/users';

export const searchUsers = (users: TUser[], query: string): TFilteredUser[] => {
	// initial filtered users
	let filteredUsers: TFilteredUser[] = users.map((user) => {
		return {
			user,
			searchTerms: `${user.firstName} ${user.lastName} ${user.username} ${user.age} ${user.email} ${user.phone} ${user.company.name} ${user.company.title} ${user.company.department}`
		};
	});

	// search by query
	filteredUsers = filteredUsers.filter((user) =>
		user.searchTerms.toLowerCase().includes(query.toLowerCase())
	);

	return filteredUsers;
};
