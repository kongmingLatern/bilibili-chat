import { KeepLiveWS } from 'bilibili-live-ws'
import { ConnectProps } from './type'
import { CMD } from './const'

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
	    // uid: 3537123099543958,
		// platform: 'web',
        // key: "8mCdpb0bCwIU_XyggngIci5Aa-vaDx_CRQnoLC6aj4w9ZG3YdmvBbNgsMdJjv4s8FnnmY1KTCdoLyDhTibUxTKwT7Xsf_nK0SNJPjUC5qtt2a4QIODZFsmU_ERm0uKOlKiPn8-naMYQoQelo-qHtp-4=",
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
		// console.log('弹幕', data)
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
