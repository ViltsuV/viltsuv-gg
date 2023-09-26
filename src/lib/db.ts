import type { User } from "$lib/types";

export default {
  getUser: async (email: FormDataEntryValue): Promise<User> => {
    let user = {
      email: '',
      username: '',
    }

    if (typeof email === 'string') {
      console.log('db.ts - user submitted email: ', email)
      user.email = email
      user.username = email
    }
    return user
  },
  createSessionJWT: async (user: User) => {
    // return value is set as session cookie
    console.log('createSessionJWT - user: ', user)
    return 'session-JWT-placeholder' + JSON.stringify(user)
  },
  getUserFromSession: async (session_JWT: string | undefined): Promise<User> => {
    let user = {
      email: 'no session JWT email',
      username: 'no session JWT username'
    }
    if (session_JWT) {
      user.email = 'email from existing session'
      user.username = 'username from existing session'
    }
    return user
  },
}