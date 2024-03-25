import type { RequestHandler } from './$types'
// server.ts - creates an 'API route' or an 'endpoint'. You have full control over the response.

// A route can exists as both a page and as an api endpoint simultaneously if it contains a +server.ts and a +page.
// More info about how that works here: https://kit.svelte.dev/docs/routing#server-content-negotiation
// TLDR:
// - req method !== GET ? -> api endpoint
// - req Accept header prioritizes text/html, -> +page, else, -> api endpoint

export const GET: RequestHandler = async () => {
	return new Response(
		JSON.stringify({
			message: 'hello from GET /example sveltekit api endpoint',
		}),
	)
}

export const POST: RequestHandler = async () => {
	return new Response(
		JSON.stringify({
			message: 'hello from POST /example sveltekit api endpoint',
		}),
	)
}
