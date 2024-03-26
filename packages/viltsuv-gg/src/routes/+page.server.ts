import type { PageServerLoad } from './$types'
import jwt from 'jsonwebtoken'
import db from '$lib/db'

export const load = (async ({ cookies, request, route, params, locals, url }) => {
    
    let stringified_session_object
    jwt.sign('stringified_session_object', 'key')
    const user = await db.getUserFromSession(cookies.get('session_id'))
	return user

}) satisfies PageServerLoad