import { Icon } from '@iconify/react'
import { createContext, useEffect, useState } from 'react'
import {
	Button,
	Divider,
	InputNumber,
	Space,
	message,
} from 'antd'
import Speech from './module/Speech'
import { getQrCodeInfo, scanQrCode } from '@/module/scan'
import { KeepLiveWS } from 'bilibili-live-ws'
import { createLiveConnect } from './module/connect'
import DanmakuList, { ItemProps } from './pages/DanmakuList'
import { CMD } from './module/connect/const'
import AvatarImg from './components/AvatarImg'
import { handleContent } from './module/danmaku'
import { useLocation, useNavigate } from 'react-router-dom'
import protobuf from 'protobufjs'
import { get } from './api'
import Avatar from '@/assets/love.png'

export const SingContext = createContext({} as any)

function App() {
	// const [url, setUrl] = useState('')
	// const [codeKey, setCodeKey] = useState('')

	const [live, setLive] = useState({} as KeepLiveWS)
	const danmakuList: Partial<ItemProps>[] = []
	const [list, setList] = useState<Partial<ItemProps>[]>([])
	const [singList, setSingList] = useState<any[]>([])
	const [roomId, setRoomId] = useState<number>(0)
	const [anchor, setAnchor] = useState<number>(0)
	// const aList = useState(JSON.parse(localStorage.getItem('avatarList') || undefined))
	const [avatarList, setAvatarList] = useState<Map<string, any>>(new Map())


	let total = 0


	function reset() {
		danmakuList.length = 0
		setList([])
	}

	function connect(roomId?) {
		const live = createLiveConnect(
			{
				// 三月直播间
				roomId: 30639870,
				// roomId: 10704,
				// roomId: 3143527
				// 凤之兮原测试直播间
				// roomId: 22021613,
				// roomId: 867764,
				// roomId: 923833,
				// roomId: 10704
				// roomId: 26307043,
				// roomId: 4245963,
				// roomId: 415174
				// roomId: 11713
			},
			{
				INTERACT_WORD: res => {
					const { msg_type, uname } = res.data
					if (msg_type === 2) {
						danmakuList.push({
							type: CMD.INTERACT_WORD,
							name: uname,
							content: (
								<span>
									<span className="color-yellow text-lg">
										{uname}
									</span>
									关注了本直播间!
								</span>
							),
							time: new Date().getTime(),
							total,
						})
						setList([...danmakuList])
					}
				},
				SEND_GIFT: async res => {
					const {
						uid,
						face,
						giftName,
						receive_user_info,
						uname,
						action,
						total_coin,
						num,
					} = res.data

					const { uname: name } = receive_user_info
					if (giftName !== '辣条') {
						total += total_coin / 100
					} else {
						total += 0
					}

					const url = await get<any>('/img/getImg', {
						url: face,
					})

					danmakuList.push({
						uid,
						avatar: url,
						name: uname,
						type: CMD.SEND_GIFT,
						money: total_coin / 100,
						content: (
							<span className="text-white font-semibold text-lg">
								<AvatarImg avatar={face} />
								<span className="color-yellow">{`[${uname}]`}</span>
								{`${action}给[${[name]}]`}
								<br />
								<span className="color-blue">
									<span className="color-yellow">{`${giftName}`}</span>
									{`  * ${num}`}
								</span>
								<br />
								<span className="color-yellow">
									<span className="color-white">
										总价值:
									</span>
									{`${giftName !== '辣条'
										? total_coin / 100 + '电池'
										: total_coin + '银瓜子'
										} `}
								</span>
							</span>
						),
						time: new Date().getTime(),
						total,
					})

					setList([...danmakuList])
				},
				ENTRY_EFFECT: res => {
					const { face, uid, copy_writing } = res.data
					const name = /<%(.*?)%>/g.exec(copy_writing)?.[1]
					danmakuList.push({
						uid,
						avatar: face,
						name: '[自动触发]',
						type: CMD.ENTRY_EFFECT,
						content: (
							<span className="text-white font-bold font-lg">
								欢迎用户 <AvatarImg avatar={face} />
								<span className="color-yellow">
									{name}
								</span>{' '}
								进入直播间!
							</span>
						),
						time: new Date().getTime(),
						total,
					})
					setList([...danmakuList])
				},
				DANMU_MSG: async res => {
					// 如果弹幕超过300,则清空弹幕,释放空间
					// if (danmakuList.length >= 1000) {
					// 	message.success('当前弹幕过多，已进行重制')
					// 	reset()
					// }

					const { dm_v2, info } = res
					// console.log(res)
					/*
					const bufferImg = Buffer.from(
						dm_v2,
						'base64'
					).slice(100, 350)
					const str =
						/(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp)/gi.exec(
							Buffer.from(bufferImg).toString()
						)?.[0]

					const url = await get<any>('/img/getImg', {
						url: str,
					})
				
								const bufferImg = Buffer.from(
						dm_v2,
						'base64'
					).slice(0)
					
					console.log(bufferImg)

					const reg =
						/(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp)/gi
					const result = Buffer.from(bufferImg)
						.toString()
						.match(reg)
					console.log(result)

					const url = await get<any>('/img/getImg', {
						url: result?.[result?.length - 1 || 0],
					})
				*/
					const content = info[1]
					const uid = info[2][0]
					const name = info[2][1]
					let url

					if (uid != 0 && avatarList.has(uid)) {
						url = avatarList.get(uid)
					} else {
						const { face } = await get<{ face: string }>('/img/getInfo', {
							uid
						})
						if (face) {
							url = await get<any>('/img/getImg', {
								url: face,
							})
						}
						setAvatarList(avatarList.set(uid, url))
						// localStorage.setItem('avatarList', JSON.stringify(avatarList))
					}

					const { node, type } = handleContent(name, content)

					if (type === CMD.LOOK_SING_LIST) {
						danmakuList.push({
							type: CMD.SPECIAL_EFFECT,
							avatar: url || Avatar,
							content: node,
							name,
							time: new Date().getTime(),
							total,
						})
					} else if (type === CMD.SING_EFFECT) {
						// NOTE: 说明是点歌
						const reg = /^点歌\s(.+?)(?:\s(.+?))?$/
						const song = reg.exec(content)?.[1]
						const singer = reg.exec(content)?.[2]

						danmakuList.push({
							type: CMD.SPECIAL_EFFECT,
							avatar: url || Avatar,
							content: node,
							name,
							time: new Date().getTime(),
							total,
						})

						singList.push({
							song,
							singer,
							url,
							name,
							currentTime: new Date().getTime(),
							expiredTime: new Date().getTime() + 240000,
						})
						setSingList([...singList])
					}

					danmakuList.push({
						type,
						avatar: url || Avatar,
						content: node,
						name,
						time: new Date().getTime(),
						total,
					})
					setList([...danmakuList])
				},
				SUPER_CHAT_MESSAGE: async res => {
					const {
						price,
						background_color,
						background_price_color,
						message,
						user_info,
						end_time,
						uid,
					} = res.data

					const url = await get<any>('/img/getImg', {
						url: user_info.face,
					})

					danmakuList.push({
						type: CMD.SUPER_CHAT_MESSAGE,
						uid,
						avatar: url,
						content: (
							<span
								style={{
									color: 'white'
								}}
							>
								<span className="color-yellow font-semibold text-lg">
									{`${user_info.uname} `}
								</span>
								{' '}留言说:
								<br />
								<span className="color-white font-semibold text-20px">
									{message}
								</span>

								<br />

								<span>SC价格：
									<span className="color-yellow font-bold text-20px">{`${price}`}</span>
								</span>
							</span>
						),
						name: user_info.uname,
						time: new Date().getTime(),
						money: price,
						background_price_color,
						end_time,
						total,
					})
					setList([...danmakuList])
				},
				LIKE_INFO_V3_CLICK: res => {
					const { uname } = res.data
					danmakuList.push({
						type: CMD.LIKE_INFO_V3_CLICK,
						name: uname,
						content: (
							<span className="color-yellow font-semibold ">
								{`${uname}`}
								<span className="color-white font-semibold">
									为直播间点赞了哦!
								</span>
							</span>
						),
						time: new Date().getTime(),
						total,
					})
					setList([...danmakuList])
				},
				GUARD_BUY: res => {
					const { uid, username, num, guard_level, price } =
						res.data
					total += price / 1000
					const user = (
						<span className="color-red font-semibold text-22px">
							{username}
						</span>
					)
					const guard = (
						<span className="color-darkblue text-22px font-bold">
							{guard_level === 3
								? '舰长'
								: guard_level === 2
									? '提督'
									: guard_level === 1
										? '总督'
										: ''
							}
						</span>
					)
					danmakuList.push({
						type: CMD.GUARD_BUY,
						uid,
						content: (
							<span>
								监测到用户 {user} 在
								<span className="color-yellow font-semibold">
									【本直播间】
								</span>
								<br />
								开通了
								{guard} {' * '} {num}{' '}个月!
								<br />
								<span>CN:
									<span className='color-red text-22px font-bold'>
										¥{price / 1000}
									</span>
								</span>
							</span>
						),
						name: username,
						time: new Date().getTime(),
						money: price / 1000,
						total,
					})
				},
				POPULARITY_RED_POCKET_NEW: res => {
					const { uid, uname, price, num, gift_name } =
						res.data

					const totalPrice = (
						<span className="text-lg color-yellow font-semibold">
							{price}
						</span>
					)
					const gift = (
						<span className="color-yellow font-semibold">
							{gift_name}
						</span>
					)
					const number = (
						<span className="color-yellow">{num}</span>
					)
					danmakuList.push({
						type: CMD.POPULARITY_RED_POCKET_NEW,
						content: (
							<span className="color-white">
								<span className="text-lg color-darkblue font-semibold">{`${uname}`}</span>{' '}
								送出了 {gift}
								{' * '}
								{number}!
								<br />
								<span className="color-white font-semibold">
									总价值: {totalPrice} 电池
								</span>
							</span>
						),
						time: new Date().getTime(),
						uid,
					})
					setList([...danmakuList])
				},
				// LIVE_INTERACTIVE_GAME: res => {
				// 	const { data } = res
				// 	const content = data.msg
				// 	const name = data.uname
				// 	const uid = data.uid
				// 	danmakuList.push({
				// 		type: CMD.LIVE_INTERACTIVE_GAME,
				// 		content,
				// 		name,
				// 		time: new Date().getTime(),
				// 		uid,
				// 	})
				// 	setList([...danmakuList])
				// },
			}
		)
		setLive(live)
	}

	useEffect(() => {
		connect()
		message.success(
			`弹幕连接成功: 房间号30639870`
		)
	}, [])

	function disConnect() {
		live.close()
		reset()
	}

	return (
		<>
			{/* <div className="bg-white overflow-hidden rounded-lg w-400px absolute-center rounded">
				<h3 className="flex-center text-center bg-#00AEEC color-white h-40px lh-40px">
					<Icon
						icon="fa6-brands:bilibili"
						className="mr-2"
						width={30}
						height={30}
						color="#fff"
					/>
					<span className="select-none">
						哔哩哔哩直播助手
					</span>
				</h3>

				<LoginForm />
			</div> */}

			{/* <Button onClick={() => live.close()}>断开连接</Button>
			<Button
				onClick={() => {
					setList([])
					danmakuList.length = 0
				}}
			>
				清空弹幕
			</Button> */}

			{/* <Speech /> */}

			<SingContext.Provider value={{ singList, setSingList }}>
				<DanmakuList
					total={list[list.length - 1]?.total || 0}
					danmakuList={list}
				/>
			</SingContext.Provider>



			{/* <Space className="items-center mt-2rem">
				<InputNumber
					className="flex w-300px"
					placeholder="限制弹幕的数量,默认300"
					// defaultValue={4245963}
					// defaultValue={23271282}
					onBlur={e => {
						setLimit(Number(e.target.value))
						message.success(
							`弹幕数量限制更改成功,当前弹幕上限为:${limit}`
						)
					}}
				/>

				<span className="color-white">
					当前弹幕上限:{' '}
					<span className="color-red font-bold text-lg">
						{limit}
					</span>
					<br />
					当前弹幕数:{' '}
					<span className="color-yellow font-boild text-lg">
						{list.length}
					</span>
				</span>
			</Space> */}



			{/* <img src={url} /> */}
		</>
	)
}

export default App
