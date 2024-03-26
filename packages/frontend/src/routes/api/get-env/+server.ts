import { env } from '$env/dynamic/private'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	console.log('+server.ts - GET /get-env')

	const res = new Response(
		JSON.stringify({ server_ts_data: '-- +server.ts GET / data --', env: env }),
	)
	return res
}
