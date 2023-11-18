export function getFormatTime(time) {
	const date = new Date(time as number)
	const hours = date.getHours()
	const mins = date.getMinutes()
	const seconds = date.getSeconds()
	const formatFn = num => {
		if (num < 10) {
			return `0${num}`
		} else {
			return num
		}
	}

	return (
		formatFn(hours) +
		':' +
		formatFn(mins) +
		':' +
		formatFn(seconds)
	)
}
