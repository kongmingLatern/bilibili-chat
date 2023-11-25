import '@/assets/background.scss'
export default function Card(props) {
	const {
		uid,
		type,
		avatar,
		cover,
		name = '[三月] 直播间专属弹幕',
		time,
		content,
		// 定制信息
		background = '',
		headerBackground = '',
		color = '',
		headerColor = '',
	} = props

	return (
		<div
			className="rounded-lg overflow-hidden card w-full bg-base-100 shadow-xl bg-red-500 marry-common h-100px lh-100px"
			style={{
				background,
				color,
			}}
		>
			{/* <header
				className="bg-red-800 color-white text-center font-semibold"
				style={{
					background: headerBackground,
					color: headerColor,
				}}
			>
				{name}
			</header>
			<figure className="mt-1rem">
				<img src={cover} alt={'头像'} width={100} />
			</figure> */}
			<div className="card-body p-0 my-1rem">
				{/* <h2 className="card-title">进场特效: {name}</h2> */}
				<p className="text-center">{content}</p>
				{/* <div className="card-actions justify-end">
					<button className="btn btn-warning">80 TA</button>
				</div> */}
			</div>
		</div>
	)
}
