export type MonorepoTypes = {
	Frontend: {
		test: 'MonorepoTypes.Frontend.test'
	}

	Shared: {
		test: 'MonorepoTypes.Shared.test'
		FirstFunctionType: <T>(param: T) => T
	}
}
