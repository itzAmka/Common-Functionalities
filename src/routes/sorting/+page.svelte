<script lang="ts">
	import NavLinks from '$lib/components/nav-links.svelte';

	export let data;

	const formatDate = (date: string) => {
		const dateFormatter = new Intl.DateTimeFormat(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		return dateFormatter.format(new Date(date));
	};
</script>

<svelte:head>
	<title>Sorting Functionality</title>
</svelte:head>

<section>
	<div class="container lg:px-20 md:px-10 px-6 py-20 flex flex-col gap-20">
		<section class="prose">
			<h1 class="text-primary mb-0">Sorting Funtionality</h1>
			<p>Use the Sorting functionality to sort your data.</p>

			<!-- links -->
			<NavLinks />
		</section>

		<section>
			{#if data.posts.length === 0}
				<div class="flex flex-col gap-4">
					<div class="prose">
						<h2 class="text-warning">No Posts found</h2>
						<p>We couldn't find any posts. Please try again later.</p>
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
			{:else}
				<div class="grid grid-cols-3 gap-x-6 gap-y-16">
					{#each data.posts as post}
						<!-- post card -->
						<article
							class="card w-full h-fit max-w-md bg-base-300 shadow-lg shadow-black rounded-md"
						>
							<!-- post image -->
							<figure class="h-96">
								<img src={post.image} alt={post.text} class="w-full object-cover h-full" />
							</figure>

							<!-- post content -->
							<div class="card-body p-4 gap-4">
								<!-- header -->
								<div class="flex items-center gap-2 p-4s">
									<!-- avatar -->
									<div class="avatar">
										<div class="w-10 rounded-full">
											<img src={post.owner.picture} alt="avatar" />
										</div>
									</div>

									<!-- name and date -->
									<div class="flex flex-col">
										<h2 class="text-sm text-primary">
											{post.owner.firstName}
											{post.owner.lastName}
										</h2>
										<p class="text-xs text-gray-400">{formatDate(post.publishDate)}</p>
									</div>
								</div>

								<!-- post body -->
								<div>
									<h3 class="text-lg font-semibold">{post.text}</h3>
									<p class="text-sm text-gray-300">#{post.tags.join(', ')}</p>
								</div>

								<!-- actions -->
								<div class="card-actions gap-4 items-center border-t border-gray-700 pt-4">
									<!-- likes -->
									<div class="flex items-center gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
											/>
										</svg>
										<p class="text-sm text-gray-300">{post.likes}</p>
									</div>

									<!-- comment icon -->
									<div class="flex items-center gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
											/>
										</svg>
									</div>

									<!-- share icon -->
									<div class="flex items-center gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</section>
