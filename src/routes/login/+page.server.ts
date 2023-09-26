import type { PageServerLoad } from './$types'
import db from '$lib/db'

export const load = (async ({cookies, request, route, }) => {
  const user = await db.getUserFromSession(cookies.get('sessionid'));
	return { user }
  // return { data: 'page data from server' }
}) satisfies PageServerLoad

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		// log the user in
    console.log('--- login/+page.server.ts --- /login default action ---')
    const form_data = await request.formData()

		const email = form_data.get('email')

		const password = form_data.get('password')

    if (!email) {
      return { success: false }
    } else {
      const user = await db.getUser(email)
      cookies.set('session_id', await db.createSessionJWT(user))

    }

		return { success: true }
	}
}