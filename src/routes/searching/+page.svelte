<script lang="ts">
	import { page } from '$app/stores';
	import queryString from 'query-string';

	import NavLinks from '$lib/components/nav-links.svelte';
	import { searchUsers } from '$lib/utils/search-users.js';
	import { goto } from '$app/navigation';

	export let data;

	const parsedQueryParams = queryString.parse($page.url.search);
	let stringifiedQueryParams = queryString.stringify(parsedQueryParams);

	let query = (parsedQueryParams.query ?? '') as string;
	let pageNumber = (parsedQueryParams.pageNumber ?? '') as string;

	$: filteredUsers = searchUsers(data.users, query);

	const updateUrl = () => {
		stringifiedQueryParams = queryString.stringify(parsedQueryParams);
		history.pushState({}, '', `?${stringifiedQueryParams}`);
	};

	const handleSearch = async (e: Event) => {
		const target = e.target as HTMLInputElement;

		query = target.value;

		parsedQueryParams.query = query;

		updateUrl();
	};

	const handlePrevPage = async () => {
		if (Number(pageNumber) <= 1) return;

		pageNumber = String(Number(pageNumber) - 1);

		parsedQueryParams.pageNumber = pageNumber;

		updateUrl();

		await goto($page.url.pathname + `?${stringifiedQueryParams}`);
	};

	const handleNextPage = async () => {
		if (Number(pageNumber) >= data.pagination.totalPages) return;

		pageNumber = String(Number(pageNumber) + 1);

		parsedQueryParams.pageNumber = pageNumber;

		updateUrl();

		await goto($page.url.pathname + `?${stringifiedQueryParams}`);
	};
</script>

<svelte:head>
	<title>Searching Functionality</title>
</svelte:head>

<section>
	<div class="container lg:px-20 md:px-10 px-6 py-20 flex flex-col gap-20">
		<section class="prose">
			<h1 class="text-primary mb-0">Searching Funtionality</h1>
			<p>Use the Searching functionality to search your data.</p>

			<!-- links -->
			<NavLinks />
		</section>

		<div class="flex flex-col gap-4">
			<!-- search bar -->
			<section>
				<form class="flex items-center justify-end">
					<input
						type="search"
						class="input focus:border-none input-accent focus:outline-primary max-w-xl w-full"
						placeholder="Search"
						bind:value={query}
						on:keyup={handleSearch}
					/>
				</form>
			</section>

			<div class="divider"></div>

			<section>
				<div class="overflow-x-auto border border-base-300">
					<table class="table table-zebra text-base">
						<!-- head -->
						<thead>
							<tr>
								<th>Name</th>
								<th>Job</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Age</th>
							</tr>
						</thead>
						<tbody>
							{#if filteredUsers.length === 0}
								<tr class="w-full">
									<td colSpan="5">
										<div class="flex py-16 flex-col items-center">
											<div class="flex flex-col gap-4">
												<div class="prose">
													<h2 class="text-warning">No data found</h2>
													<p>
														We couldn't find any user data that matches your search. <br /> Please try
														again.
													</p>
												</div>
												<!-- svg -->
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-24 w-24 text-warning"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fill-rule="evenodd"
														d="M10 0a10 10 0 0 0-7.07 2.93A10 10 0 0 0 0 10a10 10 0 0 0 2.93 7.07A10 10 0 0 0 10 20a10 10 0 0 0 7.07-2.93A10 10 0 0 0 20 10a10 10 0 0 0-2.93-7.07A10 10 0 0 0 10 0zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 0 0-4.24 10.24L10 14.46l4.24-4.22A6 6 0 0 0 10 4z"
													/>
												</svg>
											</div>
										</div>
									</td>
								</tr>
							{:else}
								{#each filteredUsers as { user }}
									<tr>
										<td>
											<div class="flex items-center gap-3">
												<div class="avatar">
													<div class="mask mask-squircle w-12 h-12">
														<img src={user.image} alt="{user.firstName} {user.lastName}" />
													</div>
												</div>
												<div>
													<div class="font-bold">{user.firstName} {user.lastName}</div>
													<div class="text-sm opacity-50">@{user.username}</div>
												</div>
											</div>
										</td>
										<td class="flex flex-col">
											<span>{user.company.title}</span>
											<span>at <span class="font-semibold">{user.company.name}</span></span>
										</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<th>{user.age} years old</th>
									</tr>
								{/each}
							{/if}
						</tbody>
						<!-- foot -->
						<tfoot>
							<tr>
								<th>Name</th>
								<th>Job</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Age</th>
							</tr>
						</tfoot>
					</table>
				</div>

				<!-- pagination -->
				<div class="flex items-center justify-center mt-4">
					<button class="btn btn-outline rounded-tr-none rounded-br-none" on:click={handlePrevPage}>
						<i class="fa-solid fa-circle-chevron-left"></i>
						<span>Prev</span>
					</button>

					<button class="btn rounded-none">
						<div>
							<span class="text-primary">page 1</span> of <span class="text-primary">100</span>
						</div>
					</button>

					<button
						class="btn btn-outline rounded-tl-none rounded-bl-none"
						disabled={data.pagination.totalPages === data.pagination.pageNumber}
						on:click={handleNextPage}
					>
						<span>Next</span>
						<i class="fa-solid fa-circle-chevron-right"></i>
					</button>
				</div>
			</section>
		</div>
	</div>
</section>
