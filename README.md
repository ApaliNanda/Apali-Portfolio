# Portfolio Website - Chokalingam Codes

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- 🎨 Modern and responsive design
- 🌓 Dark mode toggle with smooth transitions
- 📱 Mobile-friendly navigation
- 🔐 API key dashboard with CRUD experience
- 🚀 Smooth scrolling and animations
- 💼 Featured projects section
- 📧 Contact information with copy-to-clipboard functionality

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (Vanilla JS)
- Unsplash API for project images

## Getting Started

Open `docs/index.html` in your web browser to view the portfolio locally.  
Navigate to `/dashboard` (or open `docs/dashboard/index.html`) to manage API keys.

## Dark Mode

The portfolio includes a dark mode toggle button in the navigation bar. Your preference is saved in localStorage and will persist across page reloads.

## Project Structure

```
Portfolio/
├── docs/
│   ├── index.html          # Main HTML file served by GitHub Pages
│   ├── styles.css          # All styling and dark mode styles
│   ├── script.js           # Portfolio interactions
│   ├── [profile-image].jpg # Profile image
│   └── dashboard/
│       ├── index.html      # API key dashboard UI
│       ├── dashboard.css   # Dashboard-specific styles
│       └── dashboard.js    # CRUD logic for API keys
├── README.md               # Project documentation
├── push-to-github.ps1      # Helper script to push changes
└── PUSH_INSTRUCTIONS.md    # Manual push instructions
```

## License

This project is open source and available for personal use.

