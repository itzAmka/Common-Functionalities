<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex gap-4 w-fit flex-wrap">
	<a href="/" class="btn btn-sm {$page.url.pathname === '/' ? 'btn-primary' : 'btn-accent'}">
		/Home
	</a>
	<a
		href="/filtering"
		class="btn btn-sm {$page.url.pathname === '/filtering' ? 'btn-primary' : 'btn-accent'}"
	>
		/Filtering
	</a>
	<a
		href="/sorting"
		class="btn btn-sm {$page.url.pathname === '/sorting' ? 'btn-primary' : 'btn-accent'}"
	>
		/Sorting
	</a>
	<a
		href="/searching"
		class="btn btn-sm {$page.url.pathname === '/searching' ? 'btn-primary' : 'btn-accent'}"
	>
		/Searching
	</a>
</div>
