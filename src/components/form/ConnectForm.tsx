import React, { useEffect, useState } from 'react'
import {
	Button,
	Space,
	Form,
	Typography,
	InputNumber,
	Modal,
	message,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { getQrCodeInfo, scanQrCode } from '@/module/scan'
import { ipcRenderer } from 'electron'

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	roomId: string
	username?: string
	password?: string
	remember?: string
}

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	// const [value, setValue] = useState(0)
	// const [url, setUrl] = useState('')
	// const [codeKey, setCodeKey] = useState('')

	const navigate = useNavigate()

	// async function getInfo() {
	// 	const { url, qrcode_key } = await getQrCodeInfo()
	// 	setUrl(url)
	// 	setCodeKey(qrcode_key)
	// }

	// useEffect(() => {
	// 	getInfo()
	// }, [])

	// useEffect(() => {
	// 	const timer = setInterval(async () => {
	// 		const res = await scanQrCode(codeKey)
	// 		if (res.code === 0) {
	// 			message.success(res.msg)
	// 			clearInterval(timer)
	// 		}
	// 	}, 5000)
	// 	return () => clearInterval(timer)
	// }, [codeKey])

	const onFinish = (values: any) => {
		// showModal()
		// setValue(values.roomId)
		console.log('values.roomId', values.roomId)

		navigate('/home', {
			state: values,
		})
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
		// console.log('value', value)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
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
					initialValue={30639870}
				>
					<InputNumber className="w-250px" />
				</Form.Item>
				<Space
					size={24}
					className="mb-4 w-full justify-center"
					align="center"
				>
					<Typography.Text className="color-blue cursor-pointer"></Typography.Text>
					<Button type="default" htmlType="submit">
						连接
					</Button>
				</Space>
			</Form>
			{/* <Modal
				title="扫码登陆"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<img src={url} />
			</Modal> */}
		</>
	)
}

export default App
