import * as md5 from 'md5'
const appKey = '1d8b6e7d45233436'
const appSec = '560c52ccd288fed045859ed18bffd973'

function generateApiSignature(
	params: Record<string, any> = {}
) {
	// 1. 添加 appkey 字段
	params.appkey = appKey

	// 2. 按参数的 Key 重新排序
	const sortedKeys = Object.keys(params).sort()
	const sortedParams: Record<string, any> = {}
	for (const key of sortedKeys) {
		sortedParams[key] = params[key]
	}

	// 3. 对 Key-Value 进行 url query 序列化并计算 MD5 Hash
	const queryString = Object.entries(sortedParams)
		.map(
			([key, value]) =>
				`${key}=${encodeURIComponent(value)}`
		)
		.join('&')
	const hashInput = queryString + appSec
	const md5Hash = md5(hashInput)

	// 4. 增加 sign 字段
	params.sign = md5Hash

	// 返回签名后的参数
	return params
}

export { appKey, appSec, generateApiSignature }
