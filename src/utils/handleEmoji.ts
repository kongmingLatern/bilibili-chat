import EmojiData from './emoji'
export function mapperEmoji() {
	let res = EmojiData
	return res.map(i => {
		const { emoticons } = i
		return [
			...emoticons.map(i => {
				const { emoji, url } = i
				return {
					emoji,
					url,
				}
			}),
		]
	})[0]
}
