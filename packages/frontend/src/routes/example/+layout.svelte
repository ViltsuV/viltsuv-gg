<script lang="ts">
	import type { LayoutData } from './$types'

	export let data: LayoutData

	console.log('example layout data', data)
</script>

<div class="example-layout">
	<slot />
</div>
