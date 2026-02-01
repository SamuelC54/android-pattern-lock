# Android Pattern Lock Visualizer

A web application built with Vite and React to visualize all Android pattern locks with exactly 3 lines.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the patterns JSON file to the public folder:
```bash
cp ../patterns_with_3_lines.json public/
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features

- Visualizes all patterns with exactly 3 lines
- Filter patterns by length
- Search patterns by sequence
- Responsive grid layout
- Interactive pattern cards with hover effects

## Project Structure

```
web/
├── public/
│   └── patterns_with_3_lines.json  # Pattern data (copy from parent directory)
├── src/
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── PatternVisualizer.jsx       # Pattern visualization component
│   ├── PatternVisualizer.css       # Pattern styles
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
└── vite.config.js                  # Vite configuration
```

