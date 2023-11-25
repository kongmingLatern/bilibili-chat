import { CMD } from '@/module/connect/const'
import { getFormatTime } from '@/utils'
import { ItemProps } from '@/pages/DanmakuList'
import Card from './Card'
import '@/assets/animation.scss'
import '@/assets/item.scss'
import Avatar from '@/assets/avatar.jpeg'
import Call from '@/assets/call.png'
import Love from '@/assets/love.png'
import Wa from '@/assets/wa.png'
import Zan from '@/assets/zan.png'
import wa from '@/assets/wa.gif'
import Bat from '@/assets/bat.gif'
import helloween from '@/assets/avatar.webp'
import Christmas from '@/assets/1.png'
import Christmas2 from '@/assets/2.png'
import Christmas1 from '@/assets/chrismas1.png'
import Christmas4 from '@/assets/4.png'
import Christmas3 from '@/assets/chrismas3.png'
import Marry1 from '@/assets/marry1.jpg'
import Marry2 from '@/assets/marry2.jpeg'
import { useState } from 'react'

export default function CommonItem(props: Partial<ItemProps>) {
	const { uid, type, avatar, name, time, content } = props
	const [random, setRandom] =  useState(Math.floor(Math.random() * 4)) 
	const [rand, setRand] = useState(Math.floor(Math.random() * 3))

	const handleType = () => {
		switch (type) {
			case CMD.DANMU_MSG:
				return {
					color: 'royalblue'
				}
			case CMD.LIVE_INTERACTIVE_GAME:
				return {
					background: 'blue',
				}
			// 进场特效,主要是舰长
			case CMD.ENTRY_EFFECT:
				return {
					background: 'red',
				}
			case CMD.SEND_GIFT:
				return {
					background: 'yellow',
					color: 'red',
					fontWeight: 700,
				}
			default:
				break
		}
	}

	const renderImg = (random) => {
		switch (random) {
			case 0:
				return <img src={Christmas} className='absolute top-[20%] left-[9%]' />
			case 1:
				return <img src={Christmas4} className='absolute top-[23%] left-[9%]' />
			case 2:
			return <img src={Christmas3} className='absolute top-[20%] left-[9%]' />
			case 3:
			return <img src={Christmas2} className='absolute top-[20%] left-[9%]' />
			default:
		return <img src={Christmas1} className='absolute top-[17%] left-[9%]' />
		}
	}

	return (
		<li className="max-w-[1200px] enter-cover flex flex-col slide-up-animation cover h-100px overflow-hidden">
			{type === CMD.ENTRY_EFFECT && (
				<Card
					{...{
						...props,
						name: '[三月] 直播间进场特效弹幕',
						cover: Call,
					}}
				/>
			)}
			{(type === CMD.SEND_GIFT ||
				type === CMD.POPULARITY_RED_POCKET_NEW) && (
				<Card
					{...{
						...props,
						avatar,
						name: '感谢礼物',
						cover: Love,
					}}
				/>
			)}
			{type === CMD.SUPER_CHAT_MESSAGE && (
				<Card
					{...{
						...props,
						avatar,
						name: '醒目留言',
						cover: Wa,
						background: '#a40052',
						headerBackground: 'yellow',
						headerColor: 'black',
					}}
				/>
			)}
			{type === CMD.DANMU_MSG && (
				<div className="chat chat-start relative">
					{
						renderImg(random)
					}
					{/* <img src={Christmas} className='absolute top-[23%] left-[9%] w-[50%] ' /> */}
					<div className="chat-image avatar">
						<div className="w-[3rem]">
							{/* 头像 */}
							<img src={avatar} className="rounded-full" />
							{/* 头像装饰 */}
							<img
								src={helloween}
								style={{
									width: 70,
									height: 70,
									minWidth: 70,
								}}
								className="absolute top-[-12px] left-[-10px]"
							/>
						</div>
					</div>
					<div className="color-white chat-header">
						{name}{' '}
						<time className="text-xs opacity-50">
							{getFormatTime(time)}
						</time>
					</div>
					<div
						className={`relative max-w-[600px] min-w-[200px] px-20px color-black text-16px rounded-15px min-h-80px lh-80px flex flex-wrap popup font-semibold seto`}
						style={handleType()}
					>
						{content}
						<div className="absolute left-[200px] bottom-[5px] z-11 slide-up-reverse">
							<img
								src={Bat}
								width={50}
								height={50}
								style={{
									transform: 'rotate(45deg)',
								}}
							/>
						</div>

						<div className="absolute right-[-15px] bottom-[5px] z-11 slide-up">
							<img
								src={Bat}
								width={50}
								height={50}
								style={{
									transform: 'rotate(-45deg)',
								}}
							/>
						</div>
					</div>
				</div>
			)}
			{type === CMD.LIKE_INFO_V3_CLICK && (
				<Card
					{...{
						...props,
						name: '收到点赞信息',
						cover: Zan,
						background:`url(${rand ? Marry1: Marry2})`,
						headerBackground: '#511482e0720f',
					}}
				/>
			)}
			{type === CMD.GUARD_BUY && (
				<Card
					{...{
						...props,
						name: '上舰通知',
						cover: Wa,
						background:
							'linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)',
						headerBackground: 'crimson',
					}}
				/>
			)}
			{type === CMD.INTERACT_WORD && (
				<div className="chat chat-start ">
					<div
						className={`chat-bubble max-w-[500px] px-20px color-white rounded-15px min-h-40px overflow-hidden flex flex-wrap background`}
						style={handleType()}
					>
						{content}
					</div>
				</div>
			)}
		</li>
	)
}
