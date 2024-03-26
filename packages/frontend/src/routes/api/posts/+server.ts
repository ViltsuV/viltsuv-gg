// import { SVELTEKIT_API_KEY } from '$env/static/private'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	console.log('+server.ts - /api/posts')
	// console.log('🚀 ~ SVELTEKIT_API_KEY:', SVELTEKIT_API_KEY)
	// const backend_resp = await fetch('http://localhost:4000/')
	// console.log('🚀 ~ constGET:RequestHandler= ~ backend_resp:', backend_resp)

	return new Response(
		JSON.stringify({
			message: "hello from sveltekit's /api/posts",
			// apikey: SVELTEKIT_API_KEY,
		}),
	)
}
