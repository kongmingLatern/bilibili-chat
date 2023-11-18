export const enum CMD {
	/**
	 * @param 弹幕消息
	 */
	DANMU_MSG = 'DANMU_MSG',
	/**
	 * @param 进入直播间或关注消息
	 */
	INTERACT_WORD = 'INTERACT_WORD',
	/**
	 * @param 上舰通知, 舰长 / 提督 / 总督
	 */
	GUARD_BUY = 'GUARD_BUY',
	/**
	 * @param 醒目留言
	 */
	SUPER_CHAT_MESSAGE = 'SUPER_CHAT_MESSAGE',
	/**
	 * @param 投喂礼物
	 */
	SEND_GIFT = 'SEND_GIFT',
	/**
	 * @param 主播的礼物星球其一点亮
	 */
	GIFT_STAR_PROCESS = 'GIFT_STAR_PROCESS',
	/**
	 * @param 礼物连击
	 */
	COMBO_SEND = 'COMBO_SEND',
	/**
	 * @param 通知消息
	 */
	NOTICE_MSG = 'NOTICE_MSG',
	/**
	 * @param 主播准备中
	 */
	PREPARING = 'PREPARING',
	/**
	 * @param 主播信息更新
	 */
	ROOM_REAL_TIME_MESSAGE_UPDATE = 'ROOM_REAL_TIME_MESSAGE_UPDATE',
	/**
	 * @param 直播间高能用户数据刷新
	 */
	ONLINE_RANK_V2 = 'ONLINE_RANK_V2',
	/**
	 * @param 直播间高能用户数
	 */
	ONLINE_RANK_COUNT = 'ONLINE_RANK_COUNT',
	/**
	 * @param 用户到达直播间高能榜前三名的消息
	 */
	ONLINE_RANK_TOP3 = 'ONLINE_RANK_TOP3',
	/**
	 * @param 直播间被赞
	 */
	LIKE_INFO_V3_CLICK = 'LIKE_INFO_V3_CLICK',
	/**
	 * @param 直播间发红包弹幕
	 */
	POPULARITY_RED_POCKET_START = 'POPULARITY_RED_POCKET_START',
	/**
	 * @param 这个则和“送礼”的信息相似
	 */
	POPULARITY_RED_POCKET_NEW = 'POPULARITY_RED_POCKET_NEW',
	/**
	 * @param 直播间抢到红包的用户
	 */
	POPULARITY_RED_POCKET_WINNER_LIST = 'POPULARITY_RED_POCKET_WINNER_LIST',
	/**
	 * @param 直播间看过人数更新
	 */
	WATCHED_CHANGE = 'WATCHED_CHANGE',
	/**
	 * @param 有进场特效的用户进入直播间
	 */
	ENTRY_EFFECT = 'ENTRY_EFFECT',
	/**
	 * @param 直播间在所属分区的排名改变
	 *  */
	AREA_RANK_CHANGED = 'AREA_RANK_CHANGED',
	/**
	 * @param 恭喜主播 xx 成为手游航海当前第x名
	 */
	COMMON_NOTICE_DANMAKU = 'COMMON_NOTICE_DANMAKU',
	/**
	 * @param 直播间标题更改、直播间分区更改
	 */
	ROOM_CHANGE = 'ROOM_CHANGE',
	/**
	 * @param 下播直播间
	 */
	STOP_LIVE_ROOM_LIST = 'STOP_LIVE_ROOM_LIST',

	LIVE_INTERACTIVE_GAME = 'LIVE_INTERACTIVE_GAME',
}
