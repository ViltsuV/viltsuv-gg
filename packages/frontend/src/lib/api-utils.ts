import { BACKEND_IP_ADDRESS, BACKEND_PORT, BACKEND_PROTOCOL } from '$env/static/private'

type FetchFunction = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>

export const backend_url = `${BACKEND_PROTOCOL}://${BACKEND_IP_ADDRESS}:${BACKEND_PORT}`

export const get = async (
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return await fetch(url, init)
}

export const post = async (
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return await fetch(url, init)
}

export const put = async (
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return await fetch(url, init)
}

export const del = async (
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return await fetch(url, init)
}

export const patch = async (
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<Response> => {
	return await fetch(url, init)
}

export const get_and_await_json = async <T>(
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const response = await get(fetch, url, init)
	if (response.status === 204) {
		return null as T
	}
	return await response.json()
}

export const post_and_await_json = async <T>(
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const response = await post(fetch, url, init)
	if (response.status === 204) {
		return null as T
	}
	return await response.json()
}

export const put_and_await_json = async <T>(
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const response = await put(fetch, url, init)
	if (response.status === 204) {
		return null as T
	}
	return await response.json()
}

export const del_and_await_json = async <T>(
	fetch: FetchFunction,
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const response = await del(fetch, url, init)
	if (response.status === 204) {
		return null as T
	}
	return await response.json()
}

export const fetch_env = async (fetch: FetchFunction): Promise<Response> => {
	return await get_and_await_json(fetch, '/api/get-env')
}
