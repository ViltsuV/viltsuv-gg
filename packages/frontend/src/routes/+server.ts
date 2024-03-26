import type { RequestHandler } from './$types'

// A route can exists as both a page and as an api endpoint simultaneously if it contains a +server.ts and a +page.
// More info about how that works here: https://kit.svelte.dev/docs/routing#server-content-negotiation
// TLDR:
// - req method !== GET ? -> api endpoint
// - req Accept header prioritizes text/html, -> +page, else, -> api endpoint

export const GET: RequestHandler = async () => {
	console.log('+server.ts - GET / ')
	const res = new Response(JSON.stringify({ server_data: '-- +server.ts GET / data --', env: env }))
	return res
}
