const scan = '/scan'
const user = '/user'

const urls = {
	scan: {
		getQrCode: `${scan}/getQrCode`,
		scanQrCode: `${scan}/scanQrCode`,
	},

	user: {
		getUserInfo: `${user}/getUserInfo`
	},

}
export { urls }
