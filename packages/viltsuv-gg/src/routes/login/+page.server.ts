import type { PageServerLoad } from './$types'
import db from '$lib/db'
import jwt from 'jsonwebtoken'

const backend = {
  address: '127.0.0.1',
  port: '1234'
}

export const load = (async () => {

}) satisfies PageServerLoad

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => { // POST /login action
    const login_form_data = await request.formData()
		const email = login_form_data.get('email')
		const password = login_form_data.get('password')

    let email_str = email?.toString() || ''

    if (!email) {
      return { success: false }
    } else {
      const user = await db.getUser(email_str)
      cookies.set('session_id', await db.createSessionJWT(user))

    }
    const login_response = await fetch(`${backend.address}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      credentials: 'include',

    })

		return { success: true }
	}
}