<script lang="ts">
	import { page } from '$app/stores';
	import queryString from 'query-string';

	import { calculateStarFraction } from '$lib/utils/calculate-star-fraction';
	import { filterProducts } from '$lib/utils/filter-products';
	import NavLinks from '$lib/components/nav-links.svelte';

	export let data;

	const parsedQueryParams = queryString.parse($page.url.search);
	let stringifiedQueryParams = queryString.stringify(parsedQueryParams);

	const updateUrl = async () => {
		stringifiedQueryParams = queryString.stringify(parsedQueryParams);
		history.pushState({}, '', `?${stringifiedQueryParams}`);
	};

	let selectedCategory = (parsedQueryParams.category ?? 'all') as string;
	let selectedPrice = (parsedQueryParams.price ?? 'all') as string;
	let selectedRating = (parsedQueryParams.rating ?? 'all') as string;

	$: filteredProducts = filterProducts(
		data.products,
		selectedCategory,
		selectedPrice,
		selectedRating
	);

	const handleSelectedCategory = async (e: Event) => {
		const target = e.target as HTMLSelectElement;
		selectedCategory = target.value;

		parsedQueryParams.category = selectedCategory;

		updateUrl();
	};

	const handleSelectedPrice = async (e: Event) => {
		const target = e.target as HTMLSelectElement;
		selectedPrice = target.value;

		parsedQueryParams.price = selectedPrice;

		updateUrl();
	};

	const handleSelectedRating = async (e: Event) => {
		const target = e.target as HTMLSelectElement;
		selectedRating = target.value;

		parsedQueryParams.rating = selectedRating;

		updateUrl();
	};

	const resetFilters = async () => {
		selectedCategory = 'all';
		selectedPrice = 'all';
		selectedRating = 'all';

		parsedQueryParams.category = selectedCategory;
		parsedQueryParams.price = selectedPrice;
		parsedQueryParams.rating = selectedRating;

		updateUrl();
	};
</script>

<svelte:head>
	<title>Filtering Functionality</title>
</svelte:head>

<section>
	<div class="container lg:px-20 md:px-10 px-6 py-20 flex flex-col gap-20">
		<section class="prose">
			<h1 class="text-primary mb-0">Filtering Functionality</h1>
			<p>Use the filters to find the product you are looking for.</p>

			<!-- links -->
			<NavLinks />
		</section>

		<section class="flex flex-col lg:gap-20 gap-10 relative">
			<!-- filter: category, price range, rating{.count|.rate} -->
			<aside class="grow">
				<form on:submit|preventDefault class="flex md:flex-row flex-col gap-8 md:w-fit max-w-2xl">
					<!-- Category -->
					<div class="form-control gap-2">
						<label for="category">
							<select
								id="category"
								name="category"
								class="select select-bordered text-base w-full capitalize"
								bind:value={selectedCategory}
								on:change={handleSelectedCategory}
							>
								<option value="all">All Categories</option>
								{#each data.productCategories as category}
									<option value={category}>{category}</option>
								{/each}
							</select>
						</label>
					</div>

					<!-- price range -->
					<div class="form-control">
						<label for="price">
							<select
								id="price"
								name="price"
								class="select select-bordered text-base w-full"
								bind:value={selectedPrice}
								on:change={handleSelectedPrice}
							>
								<option value="all">All Prices</option>
								<option value="0-100">$0 - $100</option>
								<option value="100-500">$100 - $500</option>
								<option value="500-1000">$500 - $1000</option>
							</select>
						</label>
					</div>

					<!-- rating: 1.0 - 5.0 -->
					<div class="form-control">
						<label for="rating">
							<select
								id="rating"
								name="rating"
								class="select select-bordered text-base w-full"
								bind:value={selectedRating}
								on:change={handleSelectedRating}
							>
								<option value="all">All Ratings</option>
								<option value="1-2">1.0 - 2.0 ⭐</option>
								<option value="2-3">2.0 - 3.0 ⭐</option>
								<option value="3-4">3.0 - 4.0 ⭐</option>
								<option value="4-5">4.0 - 5.0 ⭐</option>
							</select>
						</label>
					</div>

					<button type="reset" class="btn btn-error" on:click={resetFilters}>Reset Filters</button>
				</form>
			</aside>
			<!-- products list -->
			<article class="grow-0 flex flex-col gap-8 w-full">
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full gap-y-10">
					{#if filteredProducts.length === 0}
						<div class="flex flex-col gap-4">
							<div class="prose">
								<h2 class="text-warning">No products found</h2>
								<p>
									We couldn't find any products that match your search. Please try again with
									different filters.
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
					{:else}
						{#each filteredProducts as product}
							<div class="card max-w-md bg-base-100 shadow-md shadow-gray-950">
								<figure class="h-72">
									<img src={product.image} alt={product.title} class="w-full object-cover" />
								</figure>
								<div class="card-body">
									<div class="flex items-center justify-between">
										<!-- category -->
										<span class="badge badge-primary">{product.category}</span>
										<!-- rating -->
										<div>
											{#each calculateStarFraction(product.rating.rate) as star}
												{#if star === 'full'}
													<i class="fas fa-star text-yellow-400"></i>
												{:else if star === 'half'}
													<i class="fas fa-star-half-alt text-yellow-400"></i>
												{:else}
													<i class="far fa-star text-yellow-400"></i>
												{/if}
											{/each}
										</div>
									</div>
									<h2 class="card-title">{product.title}</h2>
									<p>
										{product.description.length > 250
											? product.description.slice(0, 250) + '...'
											: product.description + '.'}
									</p>
									<div class="card-actions justify-between items-center">
										<p class="text-xl font-bold text-accent">${product.price}</p>
										<button class="btn btn-primary">Buy Now</button>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</article>
		</section>
	</div>
</section>
