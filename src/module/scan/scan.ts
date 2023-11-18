import { message } from 'antd'
import { toDataURL } from 'qrcode'
import { get } from '../../api/get'
import { QrCodeInfoType, ScanReturnType } from './type'
import { urls } from '@/api/urls'

export async function getQrCodeInfo() {
	let url = ''
	const res = await get<QrCodeInfoType>(
		urls.scan.getQrCode
	).catch((e: Record<string, any>) => {
		message.error(e.message)
	})
	toDataURL(
		(res as QrCodeInfoType).data.url,
		{},
		(err, dataURL) => {
			if (err) {
				console.error(err)
				return
			}
			url = dataURL
		}
	)
	return {
		url,
		qrcode_key: (res as QrCodeInfoType).data.qrcode_key,
	}
}

export const scanQrCode = async (qrcode_key: string) => {
	const res = await get<ScanReturnType>(
		urls.scan.scanQrCode,
		{
			qrcode_key,
		}
	)
	sessionStorage.setItem('SESSDATA', res.data.SESSDATA)
	sessionStorage.setItem('bili_jct', res.data.bili_jct)
	sessionStorage.setItem('DedeUserID', res.data.DedeUserID)
	sessionStorage.setItem('sid', res.data.sid)
	return res
}