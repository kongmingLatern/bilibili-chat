import { Icon } from '@iconify/react'
import ConnectForm from './components/form/ConnectForm'

export default function Global() {
	return (
		<div className="bg-white overflow-hidden rounded-lg w-400px absolute-center rounded">
			<h3 className="flex-center text-center bg-#00AEEC color-white h-40px lh-40px">
				<Icon
					icon="fa6-brands:bilibili"
					className="mr-2"
					width={30}
					height={30}
					color="#fff"
				/>
				<span className="select-none">
					三月弹幕姬———By 凤之兮原
				</span>
			</h3>

			<ConnectForm />
		</div>
	)
}
