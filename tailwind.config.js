const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,md,njk}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans Variable', ...defaultTheme.fontFamily.sans],
				mono: [...defaultTheme.fontFamily.mono]
			},
			colors: ({ colors }) => ({
				gray: colors.neutral,
				primary: colors.blue
			})
		}
	},
	plugins: []
}
