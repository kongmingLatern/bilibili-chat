import { get } from '@/api'
import { useEffect, useState } from 'react'

export default function AvatarImg(props) {
	const { avatar } = props
	const [url, setUrl] = useState(avatar)

	async function getImg() {
		const res = await get('/img/getImg', {
			url: avatar,
		})
		setUrl(res)
	}

	useEffect(() => {
		getImg()
	}, [])

	return (
		<img
			className="inline-block"
			src={`${url}`}
			width={30}
			height={30}
			style={{
				borderRadius: '50%',
			}}
		/>
	)
}
