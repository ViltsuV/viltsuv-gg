import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ff630f 
		"--color-primary-50": "255 232 219", // #ffe8db
		"--color-primary-100": "255 224 207", // #ffe0cf
		"--color-primary-200": "255 216 195", // #ffd8c3
		"--color-primary-300": "255 193 159", // #ffc19f
		"--color-primary-400": "255 146 87", // #ff9257
		"--color-primary-500": "255 99 15", // #ff630f
		"--color-primary-600": "230 89 14", // #e6590e
		"--color-primary-700": "191 74 11", // #bf4a0b
		"--color-primary-800": "153 59 9", // #993b09
		"--color-primary-900": "125 49 7", // #7d3107
		// secondary | #ffa742 
		"--color-secondary-50": "255 242 227", // #fff2e3
		"--color-secondary-100": "255 237 217", // #ffedd9
		"--color-secondary-200": "255 233 208", // #ffe9d0
		"--color-secondary-300": "255 220 179", // #ffdcb3
		"--color-secondary-400": "255 193 123", // #ffc17b
		"--color-secondary-500": "255 167 66", // #ffa742
		"--color-secondary-600": "230 150 59", // #e6963b
		"--color-secondary-700": "191 125 50", // #bf7d32
		"--color-secondary-800": "153 100 40", // #996428
		"--color-secondary-900": "125 82 32", // #7d5220
		// tertiary | #ffc380 
		"--color-tertiary-50": "255 246 236", // #fff6ec
		"--color-tertiary-100": "255 243 230", // #fff3e6
		"--color-tertiary-200": "255 240 223", // #fff0df
		"--color-tertiary-300": "255 231 204", // #ffe7cc
		"--color-tertiary-400": "255 213 166", // #ffd5a6
		"--color-tertiary-500": "255 195 128", // #ffc380
		"--color-tertiary-600": "230 176 115", // #e6b073
		"--color-tertiary-700": "191 146 96", // #bf9260
		"--color-tertiary-800": "153 117 77", // #99754d
		"--color-tertiary-900": "125 96 63", // #7d603f
		// success | #8ae600 
		"--color-success-50": "237 251 217", // #edfbd9
		"--color-success-100": "232 250 204", // #e8facc
		"--color-success-200": "226 249 191", // #e2f9bf
		"--color-success-300": "208 245 153", // #d0f599
		"--color-success-400": "173 238 77", // #adee4d
		"--color-success-500": "138 230 0", // #8ae600
		"--color-success-600": "124 207 0", // #7ccf00
		"--color-success-700": "104 173 0", // #68ad00
		"--color-success-800": "83 138 0", // #538a00
		"--color-success-900": "68 113 0", // #447100
		// warning | #ffa200 
		"--color-warning-50": "255 241 217", // #fff1d9
		"--color-warning-100": "255 236 204", // #ffeccc
		"--color-warning-200": "255 232 191", // #ffe8bf
		"--color-warning-300": "255 218 153", // #ffda99
		"--color-warning-400": "255 190 77", // #ffbe4d
		"--color-warning-500": "255 162 0", // #ffa200
		"--color-warning-600": "230 146 0", // #e69200
		"--color-warning-700": "191 122 0", // #bf7a00
		"--color-warning-800": "153 97 0", // #996100
		"--color-warning-900": "125 79 0", // #7d4f00
		// error | #d21919 
		"--color-error-50": "248 221 221", // #f8dddd
		"--color-error-100": "246 209 209", // #f6d1d1
		"--color-error-200": "244 198 198", // #f4c6c6
		"--color-error-300": "237 163 163", // #eda3a3
		"--color-error-400": "224 94 94", // #e05e5e
		"--color-error-500": "210 25 25", // #d21919
		"--color-error-600": "189 23 23", // #bd1717
		"--color-error-700": "158 19 19", // #9e1313
		"--color-error-800": "126 15 15", // #7e0f0f
		"--color-error-900": "103 12 12", // #670c0c
		// surface | #3d3d3d 
		"--color-surface-50": "226 226 226", // #e2e2e2
		"--color-surface-100": "216 216 216", // #d8d8d8
		"--color-surface-200": "207 207 207", // #cfcfcf
		"--color-surface-300": "177 177 177", // #b1b1b1
		"--color-surface-400": "119 119 119", // #777777
		"--color-surface-500": "61 61 61", // #3d3d3d
		"--color-surface-600": "55 55 55", // #373737
		"--color-surface-700": "46 46 46", // #2e2e2e
		"--color-surface-800": "37 37 37", // #252525
		"--color-surface-900": "30 30 30", // #1e1e1e
		
	}
}