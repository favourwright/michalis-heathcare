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
  			accent: {
  				DEFAULT: colors.teal[600],
  				teal: colors.teal[600],
  				emerald: colors.emerald[600]
  			},
  			primary: {
  				DEFAULT: colors.slate[100],
  				slate: colors.slate[100],
  				indigo: colors.indigo[500],
  				cyan: colors.cyan[500]
  			},
  			secondary: {
  				DEFAULT: colors.gray[200],
  				coolGray: colors.gray[200],
  				indigo: colors.indigo[500],
  				amber: colors.amber[400],
  				cyan: colors.cyan[500]
  			},
  			background: {
  				DEFAULT: colors.slate[100],
  				slate: colors.slate[100],
  				indigo: colors.indigo[500],
  				cyan: colors.cyan[500]
  			},
  			text: {
  				DEFAULT: colors.slate[800],
  				slate: colors.slate[800],
  				indigo: colors.indigo[500],
  				cyan: colors.cyan[500]
  			},
  			dark: {
  				DEFAULT: colors.slate[800],
  				slate: colors.slate[800],
  				indigo: colors.indigo[500],
  				cyan: colors.cyan[500]
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
