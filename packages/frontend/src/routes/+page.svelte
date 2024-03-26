<script lang="ts">
	import shared_default_function, {
		second_function,
		third_function,
	} from '@pnpm-monorepo-practice/shared'
	// import FrontendTypes from '@pnpm-monorepo-practice/types'
	import type * as types from '@pnpm-monorepo-practice/types'
	import type { MonorepoTypes } from '@pnpm-monorepo-practice/types'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	/**
	 * The page gets created with a prop named data.
	 * The sibling +page.ts load function returns this data.
	 */
	export let data: PageData

	let backend_node_env = data.data_from_page_server_ts.backend_data.env
	console.log('🚀 ~ backend_node_env:', backend_node_env)

	console.log('page.svelte - export let data:', data)

	let object_with_shared_stuff = {
		shared_function_1: shared_default_function('test'),
		shared_function_2: second_function(),
		shared_function_3: third_function(),
	}

	const type_from_destructured_import: MonorepoTypes['Frontend']['test'] =
		'MonorepoTypes.Frontend.test'

	const type_from_named_import: types.MonorepoTypes['Frontend']['test'] =
		'MonorepoTypes.Frontend.test'

	const test_obj = {
		a: type_from_named_import,
		b: type_from_destructured_import,
		c: object_with_shared_stuff,
	}
	console.log('test_obj', test_obj)

	let messages: string[] = []
	let api_endpoint_fetched_env = data.data_from_page_server_ts.page_server_ts_load.env.env

	const fetch_posts_in_clientside_page_svelte = async () => {
		const posts = await fetch('/api/posts')
		const post = await posts.json()

		messages.push(post.message)
		messages = messages
	}

	onMount(() => {
		fetch_posts_in_clientside_page_svelte()
	})
</script>

<div class="container mx-auto flex h-full items-center justify-center py-12">
	<div class="flex flex-col items-center space-y-10 text-center">
		<h2 class="h2">Call APIs:</h2>

		<div class="flex flex-col">
			{#if messages !== undefined}
				<fieldset class="border border-secondary-500 p-2">
					<legend>fetched from backend</legend>
					<button
						type="button"
						class="variant-filled-primary btn mb-4"
						on:click={fetch_posts_in_clientside_page_svelte}
					>
						call sveltekit server route /api/posts
					</button>
					<p class="flex flex-wrap gap-2">
						{#each messages as message}
							<code class="code">{message}</code>
						{/each}
						<code class="code">backend_node_env: {backend_node_env}</code>
					</p>
				</fieldset>
			{/if}

			{#if api_endpoint_fetched_env !== undefined}
				<fieldset class="border border-secondary-500 p-2">
					<legend>env items passed to +page.svelte as the data prop</legend>
					<div class="flex flex-wrap gap-x-2">
						{#each Object.keys(api_endpoint_fetched_env) as env_item}
							<div>
								<code class="code">{env_item}</code>
							</div>
						{/each}
					</div>
				</fieldset>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
