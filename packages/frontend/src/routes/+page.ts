import type { PageLoad } from './$types'

export const load = (async ({ data }) => {
	console.log('-- page.ts data (data we received from page.server.ts) --', data)
	return {
		// if we need to use both, we can use the data we reveive as the data prop
		data_from_page_server_ts: data,
		page_ts_load: '-- page.ts load -- return value',
	}
}) satisfies PageLoad
