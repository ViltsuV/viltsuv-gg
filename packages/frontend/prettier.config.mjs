import base_prettier_config, { prettier_plugin_svelte_config } from '../../prettier.config.mjs'

const prettier_config = {
	...base_prettier_config,
	...prettier_plugin_svelte_config,
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	proseWrap: 'preserve',
	singleAttributePerLine: false,
}

export default prettier_config
