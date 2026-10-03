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

const status = {
  default: "#F1F1F1",
  red: "#FF454E",
  black: "#2D262E",
  blue: "#2E5BFF",
  gray: "#AEAEAE",
  green: "#88E34D",
  'light-blue': "#87CEEB",
  orange: "#FFA500",
  pink: "#F5A4C5",
  teal: "#20C997",
  yellow: "#FDF264",
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
    text: {
      xs: { fontSize: '12px', lineHeight: '16px' },
      sm: { fontSize: '14px', lineHeight: '20px' },
      base: { fontSize: '16px', lineHeight: '24px' },
      md: { fontSize: '18px', lineHeight: '28px' },
      lg: { fontSize: '20px', lineHeight: '28px' },
      xl: { fontSize: '24px', lineHeight: '32px' },
    },
    colors: { 
      primary,
      black: general['black'],
      gray: general['gray'],
      darkGray: general['darkGray'],
      lightGray: general['lightGray'],
      white: general['white'],
      error: general['error'],
      status,
    },
  },
  preflights: [
    {
      getCSS: () => `
        .base-text-input,
        .base-select,
        .base-textarea {
          border-radius: 8px;
          min-height: 40px;
          padding: 12px;
          display: flex;
          align-items: center;
          min-width: 220px;
        }

        .base-text-input:has(input:disabled),
        .base-textarea:has(textarea:disabled) {
          border: 2px solid ${general.lightGray} !important;
          background-color: #f0f0f0;
        }

        .base-text-input input:disabled,
        .base-textarea textarea:disabled {
          cursor: not-allowed;
        }

        .base-text-input:has(input:focus),
        .base-textarea:has(textarea:focus) {
          border: 2px solid ${general.black} !important;
        }

        .base-text-input input,
        .base-textarea textarea {
          outline: none;
          flex: 1;
          min-width: 0;
        }

        .base-textarea textarea {
          border: none;
          background: transparent;
          font-family: inherit;
          resize: vertical;
        }

        .base-text-input input::placeholder,
        .base-textarea textarea::placeholder {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: bold;
          color: ${general.gray};
        }

        .base-select {
          position: relative;
          cursor: pointer;
        }

        .base-select::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid ${general.darkGray};
        }

        .base-select.is-disabled {
          border-color: ${general.lightGray};
          background-color: #f0f0f0;
          cursor: not-allowed;
        }

        .base-select.is-open {
          border-color: ${general.black};
        }

        .base-select__value,
        .base-select__placeholder {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .base-select__placeholder {
          color: ${general.gray};
        }

        .base-select__dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          max-height: 240px;
          overflow-y: auto;
          border: 1px solid ${general.gray};
          border-radius: 8px;
          background: ${general.white};
          z-index: 10;
        }

        .base-select__search {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${general.gray};
          padding: 10px 12px;
          outline: none;
          font-family: inherit;
        }

        .base-select__option {
          padding: 8px 12px;
          cursor: pointer;
        }

        .base-select__option:hover {
          background: ${general.lightGray};
        }

        .base-select__option--selected {
          background: ${general.lightGray};
          font-weight: bold;
        }

        .base-select__empty {
          padding: 8px 12px;
          color: ${general.gray};
        }

        .error.base-text-input,
        .error.base-select,
        .error.base-textarea {
          border: 2px solid ${general.error} !important;
        }

        .error.base-multiselect > .base-multiselect__control {
          border: 2px solid ${general.error} !important;
        }

        .error input::placeholder,
        .error textarea::placeholder {
          color: oklch(88.5% 0.062 18.334) !important;
        }

        .base-multiselect {
          position: relative;
          min-width: 220px;
        }

        .base-multiselect__control {
          min-height: 40px;
          border: 2px solid ${general.gray};
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
          background: ${general.white};
        }

        .base-multiselect.is-disabled .base-multiselect__control {
          border-color: ${general.lightGray};
          background-color: #f0f0f0;
          cursor: not-allowed;
        }

        .base-multiselect.is-disabled .base-multiselect__chip-remove {
          cursor: not-allowed;
        }

        .base-multiselect__chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: ${general.lightGray};
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 12px;
        }

        .base-multiselect__chip-remove {
          border: none;
          background: none;
          cursor: pointer;
          line-height: 1;
          color: ${general.darkGray};
        }

        .base-multiselect__dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          border: 1px solid ${general.gray};
          border-radius: 8px;
          background: ${general.white};
          z-index: 10;
          max-height: 240px;
          overflow-y: auto;
        }

        .base-multiselect__search {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${general.gray};
          padding: 10px 12px;
          outline: none;
          font-family: inherit;
        }

        .base-multiselect__list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .base-multiselect__option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          cursor: pointer;
        }

        .base-multiselect__option:hover {
          background: ${general.lightGray};
        }

        .base-multiselect__empty {
          padding: 8px 12px;
          color: ${general.gray};
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
