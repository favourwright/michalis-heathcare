import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
				"mindaro": {
					DEFAULT: "#d1fda2",
					100: "#2b5102",
					200: "#55a203",
					300: "#80f305",
					400: "#a8fb4f",
					500: "#d1fda2",
					600: "#d9fdb3",
					700: "#e3fec6",
					800: "#ecfed9",
					900: "#f6ffec"
				},
				"yale-blue": {
					DEFAULT: "#1b406e",
					100: "#050d16",
					200: "#0b1a2c",
					300: "#102743",
					400: "#153459",
					500: "#1b406e",
					600: "#2964ab",
					700: "#4b88d3",
					800: "#87b0e2",
					900: "#c3d7f0"
				},
				"tiffany-blue": {
					DEFAULT: "#86e8d7",
					100: "#0c3e35",
					200: "#187b6b",
					300: "#23b9a0",
					400: "#49dcc4",
					500: "#86e8d7",
					600: "#9fede0",
					700: "#b7f1e8",
					800: "#cff6ef",
					900: "#e7faf7"
				},
				"lavender-blush": {
					DEFAULT: "#f6e8ea",
					100: "#451b21",
					200: "#8a3642",
					300: "#c15f6e",
					400: "#dca4ac",
					500: "#f6e8ea",
					600: "#f8edef",
					700: "#faf2f3",
					800: "#fcf6f7",
					900: "#fdfbfb"
				}
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		keyframes: {
  			wiggle: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'25%': {
  					transform: 'translateX(-10px)'
  				},
  				'50%': {
  					transform: 'translateX(10px)'
  				},
  				'75%': {
  					transform: 'translateX(-10px)'
  				}
  			}
  		},
  		animation: {
  			wiggle: 'wiggle 2s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
} satisfies Config;
