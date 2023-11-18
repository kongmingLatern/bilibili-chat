import { ItemProps } from '@/pages/DanmakuList'
import { Space } from 'antd'
import AvatarImg from './AvatarImg'
import '@/assets/animation.scss'

export default function SuperChat(
	props: Partial<Record<'chatList', ItemProps[]>>
) {
	return (
		<Space size={16} className="overflow-x-auto">
			{props.chatList &&
				props.chatList.map(i => {
					return (
						new Date().getTime() - i.end_time! > 0 && (
							<div
								className="slide-from-bottom h-auto text-nowrap min-w-100px badge badge-info gap-2"
								style={{
									background:
										i.money! > 50
											? 'yellow'
											: i.money! > 100
											? 'orange'
											: i.money! > 1000
											? 'red'
											: '',
								}}
							>
								<AvatarImg avatar={i.avatar} />
								CN:{' '}
								<span
									style={{
										color:
											i.background_price_color ?? 'color',
									}}
								>
									{i.money}
								</span>
							</div>
						)
					)
				})}
		</Space>
	)
}
