# BlueBox Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Features a clean interface with data visualization, user management, and real-time analytics.


## Features

- 📊 Interactive data visualization with Chart.js
- 📱 Fully responsive design
- 🎨 Modern UI with gradient cards
- 📋 User management table with status tracking
- 🔍 Search functionality
- 📈 Real-time analytics display

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Chart.js / React-Chartjs-2
- Lucide React Icons
- Vite

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
├── index.css      # Global styles
└── vite-env.d.ts  # TypeScript declarations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme by modifying `tailwind.config.js`:

```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Add your custom theme configuration here
    },
  },
  plugins: [],
}
```

### Charts

Charts are implemented using Chart.js with the React-Chartjs-2 wrapper. You can customize chart options in the `chartOptions` object within `App.tsx`.

### Icons

The project uses Lucide React for icons. You can import additional icons from the library as needed:

```typescript
import { IconName } from 'lucide-react';
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
