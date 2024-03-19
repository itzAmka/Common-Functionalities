<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Products | Filtering</title>
</svelte:head>

<section>
	<div class="container lg:px-20 md:px-10 px-6 py-20 flex flex-col gap-20">
		<section class="prose">
			<h1 class="text-primary mb-0">Products List</h1>
			<p>Use the filters to find the product you are looking for.</p>
		</section>

		<section class="flex flex-col lg:gap-20 gap-10 relative">
			<!-- filter: category, price range, rating{.count|.rate} -->
			<aside class="grow flex lg:flex-row flex-col gap-6 justify-between">
				<div class="prose">
					<h3 class="font-semibold">
						<i class="fa-solid fa-sliders"></i>
						<span>Filter Products</span>
					</h3>
				</div>
				<form on:submit|preventDefault class="flex md:flex-row flex-col gap-8 md:w-fit max-w-2xl">
					<!-- Category -->
					<div class="form-control gap-2">
						<label for="category">
							<select id="category" name="category" class="select select-bordered text-base w-full">
								<option value="all">All Categories</option>
								<option value="electronics">Electronics</option>
								<option value="clothing">Clothing</option>
								<option value="home">Home</option>
							</select>
						</label>
					</div>

					<!-- price range -->
					<div class="form-control">
						<label for="price">
							<select id="price" name="price" class="select select-bordered text-base w-full">
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
							<select id="rating" name="rating" class="select select-bordered text-base w-full">
								<option value="all">All Ratings</option>
								<option value="1-2">1.0 - 2.0 ⭐</option>
								<option value="2-3">2.0 - 3.0 ⭐</option>
								<option value="3-4">3.0 - 4.0 ⭐</option>
								<option value="4-5">4.0 - 5.0 ⭐</option>
							</select>
						</label>
					</div>

					<button type="reset" class="btn btn-error">Reset Filters</button>
				</form>
			</aside>
			<!-- products list -->
			<article class="grow-0 flex flex-col gap-8 w-full">
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full gap-y-10">
					{#each data.products as product}
						<div class="card max-w-md bg-base-100 shadow-md shadow-gray-950">
							<figure class="h-72">
								<img src={product.image} alt={product.title} class="w-full object-cover" />
							</figure>
							<div class="card-body">
								<h2 class="card-title">{product.title}</h2>
								<p>
									{product.description.length > 250
										? product.description.slice(0, 250) + '...'
										: product.description + '.'}
								</p>
								<div class="card-actions justify-end">
									<button class="btn btn-primary">Buy Now</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</article>
		</section>
	</div>
</section>
