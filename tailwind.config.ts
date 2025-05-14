// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other paths where you use Tailwind classes
  ],
  theme: {
    container: {
      center: true, // This centers the container automatically
      padding: {    // Optional: Define default padding for the container
        DEFAULT: '1rem', // Default padding for mobile
        sm: '1.5rem',    // Padding for sm screens and up
        lg: '2rem',      // Padding for lg screens and up
      },
      screens: {
        // Define the max-width of the container at different breakpoints
        // These values will be used instead of Tailwind's default screen widths for the .container class
        sm: '640px',   // Standard Tailwind sm breakpoint
        md: '768px',   // Standard Tailwind md breakpoint
        lg: '1024px',  // Standard Tailwind lg breakpoint
        xl: '1280px',   // This is 80rem, equivalent to max-w-7xl
        '2xl': '1280px', // Explicitly cap the container at 1280px for the 2xl breakpoint as well
        // Tailwind's default 2xl screen is 1536px.
      },
    },
    extend: {
    },
  },
  plugins: [],
}

export default config