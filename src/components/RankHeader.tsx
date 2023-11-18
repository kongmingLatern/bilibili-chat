import { ItemProps } from '@/pages/DanmakuList'
import SuperChat from './SuperChat'
import { Space } from 'antd'
import Love from '@/assets/love.png'
import '@/assets/animation.scss'
import { useState } from 'react'

export default function RankHeader(
	props: Partial<
		Record<'chatList', ItemProps[]> &
			Record<'total', number>
	>
) {
	const [arr, setArr] = useState<number[]>([])
	let [a, setA] = useState(0)
	return (
		<div
			className="sticky flex white-nownap top-0 left-0 z-10"
			style={{
				background: 'rgba(255, 255, 255, 0.3)',
			}}
		>
			<button className="btn">
				<span>今日收到礼物总价值:</span>
				<div className="badge">{props.total}</div>
				电池
			</button>



			<SuperChat chatList={props.chatList} />
		</div>
	)
}
