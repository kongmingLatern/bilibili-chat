import React from 'react'
import {
	Button,
	Space,
	Form,
	Input,
	Typography,
} from 'antd'

const onFinish = (values: any) => {
	console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	roomId: string
	username?: string
	password?: string
	remember?: string
}

const App: React.FC = () => (
	<Form
		className="p-5 pb-0"
		name="basic"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		style={{ maxWidth: 600 }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		autoComplete="off"
	>
		<Form.Item<FieldType>
			labelAlign="left"
			wrapperCol={{ pull: 3 }}
			label="直播间Id"
			name="roomId"
			className="w-400px select-none"
		>
			<Input />
		</Form.Item>

		<Form.Item<FieldType>
			labelAlign="left"
			wrapperCol={{ pull: 3 }}
			label="认证密钥"
			name="password"
			className="w-400px select-none"
		>
			<Input.Password />
		</Form.Item>

		<Space
			size={24}
			className="mb-4 w-full justify-between"
			align="center"
		>
			<Typography.Text className="color-blue cursor-pointer">
				没有密钥?点击申请
			</Typography.Text>
			<Button type="default" htmlType="submit">
				连接
			</Button>
		</Space>
	</Form>
)

export default App
