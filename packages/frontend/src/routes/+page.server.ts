import { env } from '$env/dynamic/private'
import { fetch_env, get_and_await_json } from '$lib/api-utils'

import type { PageServerLoad } from './$types'

const backend_url = `http://${env.BACKEND_IP_ADDRESS + ':' + env.BACKEND_PORT}`

/**
 * Your load function should always run on the server if it
 * uses private environment variables or accesses a database.
 * If so, it should go in a +page.server.ts.
 *
 * If both a +page.ts and a +page.server.ts define a load function, the
 * server-version is used for the data prop.
 */
export const load = (async ({ fetch }) => {
	const backend_data: Record<string, string> = await get_and_await_json(
		fetch,
		`${backend_url}/ping`,
	)

	// console.log('page.server.ts - load - backend_data:', backend_data)

	const fetched_env = await fetch_env(fetch)

	const root_page_server_ts_data = {
		page_server_ts_load: {
			message: '-- +page.server.ts -- load return value',
			env: fetched_env,
		},
		backend_data,
	}
	return root_page_server_ts_data
}) satisfies PageServerLoad
