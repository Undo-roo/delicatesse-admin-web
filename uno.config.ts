import { 
  defineConfig,
  presetTypography,
  presetWind4
} from 'unocss'

const primary = {
  50: '#faf5fa',
  100: '#f3e9f5',
  200: '#ead4ec',
  300: '#dbb5e0',
  400: '#c58dcc',
  500: '#a761b0',
  600: '#863690',
  700: '#6c2176', // Brand Color
  800: '#54115c',
  900: '#3f0647',
  950: '#26002b',
  DEFAULT: '#6c2176',
}

const general = {
  black: "#2D262E",
  gray: "#AEAEAE",
  darkGray: "#555555",
  lightGray: "#F1F1F1",
  white: "#FFFFFF",
  error: "#b91c1c",
}

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography(),
  ],
  theme: {
    fontFamily: {
      sans: ["'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
    },
    colors: { 
      primary,
      black: general['black'],
      gray: general['gray'],
      darkGray: general['darkGray'],
      lightGray: general['lightGray'],
      white: general['white'],
      error: general['error'],
    },
  },
  preflights: [
    {
      getCSS: () => `
        .base-text-input {
          border: 2px solid ${general.gray};
          border-radius: 8px;
          min-height: 40px;
          padding: 12px;
          display: flex;
          align-items: center;
          min-width: 220px;
        }

        .base-text-input:has(input:disabled) {
          border: 2px solid ${general.lightGray} !important;
          background-color: #f0f0f0;
        }

        .base-text-input:has(input:focus) {
          border: 2px solid ${general.black} !important;
        }

        .base-text-input input {
          outline: none;
          min-width: 100%;
        }

        .base-text-input input::placeholder {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: bold;
          color: ${general.gray};
        }

        .error {
          border: 2px solid ${general.error} !important;
        }

        .error input::placeholder {
          color: oklch(88.5% 0.062 18.334) !important;
        }

        a {
          color: ${primary[700]};
          text-decoration-color: ${primary[400]};
        }

        a:hover {
          color: ${primary[800]};
        }

        blockquote {
          border-left-color: ${primary[500]};
        }

      `,
    },
  ],
})
