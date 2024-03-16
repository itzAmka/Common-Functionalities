import tailwindTypography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import { sunset } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true
			}
		}
	},
	daisyui: {
		themes: [
			{
				sunset: {
					...sunset,
					error: '#b91c1c'
				}
			}
		]
	},
	plugins: [tailwindTypography, daisyui]
};
