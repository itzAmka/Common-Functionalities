<script lang="ts">
	import NavLinks from '$lib/components/nav-links.svelte';

	export let data;
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
						type="text"
						class="input focus:border-none input-accent focus:outline-primary max-w-xl w-full"
						placeholder="Search"
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
							{#if data.users.length === 0}
								<tr>
									<td colSpan="5" class="text-center"> No data found </td>
								</tr>
							{:else}
								{#each data.users as user}
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
					<button class="btn btn-outline rounded-tr-none rounded-br-none">
						<i class="fa-solid fa-circle-chevron-left"></i>
						<span>Prev</span>
					</button>

					<button class="btn rounded-none">
						<div>
							<span class="text-primary">page 1</span> of <span class="text-primary">100</span>
						</div>
					</button>

					<button class="btn btn-outline rounded-tl-none rounded-bl-none">
						<span>Next</span>
						<i class="fa-solid fa-circle-chevron-right"></i>
					</button>
				</div>
			</section>
		</div>
	</div>
</section>
