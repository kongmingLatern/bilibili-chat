export type ScanCode = 0 | 86038 | 86090 | 86101

export interface QrCodeInfoType {
	code: ScanCode
	data: Record<'qrcode_key', string> & Record<'url', string>
	message: string
	ttl: number
}

interface HeaderOptions {
	SESSDATA: string
	bili_jct: string
	DedeUserID: string
	DedeUserID__ckMd5: string
	sid: string
}

export interface ScanDataType {
	code: ScanCode
	message: string
	refresh_token: string
	sessionData: string
	timestamp: string
	url: string
}

export interface ScanReturnType {
	code: ScanCode
	msg: string
	data: ScanDataType & HeaderOptions
}
