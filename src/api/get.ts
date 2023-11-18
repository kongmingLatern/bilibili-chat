import { axios } from './axios'

export async function get<T>(
	path: string,
	params?: Record<string, any>
): Promise<T> {
	return await axios.get(path, {
		params: { ...params },
	})
}

export async function post<T>(
	path: string,
	body?: Record<string, any>
): Promise<T> {
	return await axios.post(path, body)
}
