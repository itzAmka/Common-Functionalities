<script lang="ts">
	import NavLinks from '$lib/components/nav-links.svelte';
</script>

<svelte:head>
	<title>Home | Filtering</title>
</svelte:head>

<section class="flex items-center justify-center min-h-screen p-4">
	<div
		class="border flex flex-col gap-10 shadow-lg rounded-lg p-6 py-10 border-success shadow-black"
	>
		<div class="prose">
			<h1 class="text-3xl font-bold">Common Functionalities</h1>
			<p>
				Here are some common functionality that you can use to filter, search, and sort your data.
			</p>
		</div>

		<NavLinks />
	</div>
</section>
