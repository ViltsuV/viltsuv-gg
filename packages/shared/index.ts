const first_function = <T>(param: T): T => {
	console.log('called the shared first function')
	return param
}

export const second_function = (): void => {
	console.log('called the shared second function')
}

export const third_function = (): void => {
	console.log('called the shared third function')
}

export default first_function
