const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,md,njk}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
				mono: [...defaultTheme.fontFamily.mono]
			},
			colors: ({ colors }) => ({
				primary: colors.blue
			})
		}
	},
	plugins: []
}
