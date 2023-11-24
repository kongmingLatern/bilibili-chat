import { KeepLiveWS } from 'bilibili-live-ws'
import { ConnectProps } from './type'
import { CMD } from './const'
import {v4} from 'uuid'

interface Methods<T> {
	open: (args?: T) => any
	live: (args?: T) => any
	msg: (args?: T) => any
	close: (args?: T) => any
	DANMU_MSG: (args?: T) => any
	ENTRY_EFFECT: (args?: T) => any
	SEND_GIFT: (args?: T) => any
	LIVE_INTERACTIVE_GAME: (args?: T) => any
	SUPER_CHAT_MESSAGE: (args?: T) => any
	INTERACT_WORD: (args?: T) => any
	LIKE_INFO_V3_CLICK: (args?: T) => any
	GUARD_BUY: (args?: T) => any
	POPULARITY_RED_POCKET_NEW: (args?: T) => any
	heartbeat: (args?: T) => any
}

export function createLiveConnect(
	props: ConnectProps,
	options: Partial<Methods<any>>
) {
	const authBody = {
		...props.authBody,
		// uid: '3537123099543958',
		// key: 'oZp5aBHs7XShtu_uYbN5jvpTxJoW6OeAHRMMdkaTR5StPZB3mgcnB5rWyFFAV5htUw-dFvjwkwFudULJvy9QvUJYOpXPUhD1n2osJKazg8XnmsmgRv-2p1bKkXe8BV7_GcR76-mTdBaRjUggnyGWzvGb8JU=',	
		// platform: 'web',
		// protover: 3,
		// buvid: v4() + 'infoc'
		// uid: 27564630,
		// key: 'atxCF7k5d-ox9JZe3scXBLDHSYfWRD9WzxBBNQxYAvJ2sAcSuURjHV9Yft8WfBePleUMc1DMS1fpsMm6O3hMoYyOxMzqg4QAgc_qiwBQuGbwyohUmO-t_B0mnmj8ZBlhKMqTVkbmWkDfrIPGoyw6bf3em0bc'
		// key: '2ZHIkAQENT9QigRHsQj5z2OWXJz5KZub_ocimvHb70J_CrWf1nsPeFiCuybbQNkistA7ZnAsVFRPYLDiL3ngT4L6KQ0-YSt47wBxSWpdzyUeWwiUn05i0tDcWy1JFO1c1lFgqWS1plnToby1QBAgxAEwug=='
	    // uid: 3537123099543958,
	    // uid: 3537123099543958,
        // key: "8mCdpb0bCwIU_XyggngIci5Aa-vaDx_CRQnoLC6aj4w9ZG3YdmvBbNgsMdJjv4s8FnnmY1KTCdoLyDhTibUxTKwT7Xsf_nK0SNJPjUC5qtt2a4QIODZFsmU_ERm0uKOlKiPn8-naMYQoQelo-qHtp-4=",
		// buvid: props.buvid,
		// platform: 'web',
	}

	const live = new KeepLiveWS(
		props?.roomId as number,
		authBody
	)

	live.on('open', () => {
		console.log('已连接直播弹幕服务器')
		options.open?.()
		// addInfoDanmaku('已连接直播弹幕服务器')
	})
	live.on('live', () => {
		console.log('已连接直播间', props.roomId)
		options.live?.()
		// addInfoDanmaku(`已连接直播间 ${props.room}`)
	})
	live.on(CMD.POPULARITY_RED_POCKET_NEW, data => {
		options.POPULARITY_RED_POCKET_NEW?.(data)
	})
	// live.send('')
	live.on('msg', data => {
		options.msg?.(data)
		// addInfoDanmaku(`已连接直播间 ${props.room}`)
	})
	live.on(CMD.GUARD_BUY, data => {
		options.GUARD_BUY?.(data)
	})
	// 直播间点赞
	live.on(CMD.LIKE_INFO_V3_CLICK, data => {
		options.LIKE_INFO_V3_CLICK?.(data)
	})
	live.on(CMD.INTERACT_WORD, data => {
		options.INTERACT_WORD?.(data)
	})
	live.on(CMD.SUPER_CHAT_MESSAGE, data => {
		console.log('SUPER_CHAT', data)
		options.SUPER_CHAT_MESSAGE?.(data)
	})
	live.on(CMD.SEND_GIFT, data => {
		options.SEND_GIFT?.(data)
	})
	live.on('ENTRY_EFFECT', data => {
		// console.log('进场特效', data)
		options.ENTRY_EFFECT?.(data)
	})

	live.on('DANMU_MSG', data => {
		console.log('弹幕', data)
		options.DANMU_MSG?.(data)
	})

	live.on('LIVE_INTERACTIVE_GAME', data => {
		// console.log('INTERACTIVE_GAME', data)
		options.LIVE_INTERACTIVE_GAME?.(data)
	})

	live.on('close', () => {
		console.log('已断开与直播弹幕服务器的连接')
		options.close?.()
	})
	live.on('heartbeat', online => {
		options.heartbeat?.()
	})

	return live
}
