/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        unblue: '#0091b9',
        unprimary: '#00adef',
        undark: '#212529',
        unlight: '#f8f9fa',
        arcadeDark: '#090D16',
        arcadeCard: 'rgba(15, 23, 42, 0.75)',
        sdg: {
          1: '#E5243B',
          2: '#DDA63A',
          3: '#4C9F38',
          4: '#C5192D',
          5: '#FF3A21',
          6: '#26BDE2',
          7: '#FCC30B',
          8: '#A21942',
          9: '#FD6925',
          10: '#DD1367',
          11: '#FD9D24',
          12: '#BF8B2E',
          13: '#3F7E44',
          14: '#0A97D9',
          15: '#56C02B',
          16: '#00689D',
          17: '#19486A'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Oswald', 'system-ui', 'sans-serif'],
        heading: ['Oswald', 'Roboto', 'sans-serif'],
        arcade: ['"Press Start 2P"', 'monospace', 'cursive']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounceDown 0.8s ease-in-out infinite',
        'pop-pulse': 'pulsePop 0.8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shake': 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'confetti-float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulsePop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 145, 185, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 145, 185, 0.8)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-8px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(8px, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
