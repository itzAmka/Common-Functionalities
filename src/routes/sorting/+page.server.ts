import type { PageServerLoad } from './$types';
import type { TPost } from '$lib/types/posts';
import { DUMMY_APP_APP_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

const API_BASE_URL = 'https://dummyapi.io/data/v1';

export const load = (async ({ fetch }) => {
	const postsRes = await fetch(`${API_BASE_URL}/post`, {
		headers: {
			'app-id': DUMMY_APP_APP_ID
		}
	});

	if (!postsRes.ok) {
		console.log(postsRes);

		error(postsRes.status, 'Failed to load posts.');
	}

	const posts = await postsRes.json();

	return {
		posts: posts.data as TPost[]
	};
}) satisfies PageServerLoad;
