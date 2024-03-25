// Base prettier config

/** @type { import("prettier").Config } */
const prettier_base_config = {
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	htmlWhitespaceSensitivity: 'css',
	printWidth: 100,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	semi: false,
	singleAttributePerLine: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
}

/** @type { import("prettier-plugin-svelte").PluginConfig } */
export const prettier_plugin_svelte_config = {
	svelteAllowShorthand: true,
	// svelteBracketNewLine: true,
	svelteIndentScriptAndStyle: true,
	svelteSortOrder: 'scripts-options-markup-styles',
	svelteStrictMode: false,
}

export default prettier_base_config
