/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch',

                    }
                }
            }
        },
    },
    safelist: [
        'bg-green-600',
        'text-green-500',
        'bg-red-600',
        'text-red-500',
        'bg-blue-600',
        'text-blue-500',
        'lg:text-4xl',
    ],
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography'),
    ],
    darkMode: "class",

};
