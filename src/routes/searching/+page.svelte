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
	</div>
</section>
