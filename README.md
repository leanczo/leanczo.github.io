# Developer Portfolio - Leandro Cardozo

A modern, responsive developer portfolio built with React, TypeScript, and Tailwind CSS, featuring a GitHub Markdown-style design.

![Portfolio Preview](https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🚀 Features

- 📱 Fully responsive design
- 🌓 Dark/Light mode with system preference detection
- 📑 Markdown-style documentation theme
- 🎯 Animated tab transitions
- 💻 Code snippet highlighting
- 🔗 Social media integration
- ☕ Buy Me a Coffee integration

## 🛠️ Built With

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Markdown CSS
- Lucide React Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🚀 Despliegue en GitHub Pages

Asegúrate de haber configurado la propiedad "homepage" y los scripts en el archivo package.json de la siguiente forma:

```json
"homepage": "https://<tu-usuario>.github.io/<nombre-del-repo>",
"scripts": {
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist",
  // ...existing scripts...
}
```

Una vez hecho esto y que tu proyecto esté subido a un repositorio de GitHub, sigue estos pasos:

1. Ejecuta en la terminal:
   ```bash
   npm run deploy
   ```
   Esto generará un build de tu proyecto y creará (o actualizará) la rama `gh-pages` con el contenido de la carpeta `build`.

2. Entra a tu repositorio en GitHub, dirígete a **Settings > Pages**, selecciona la rama `gh-pages` y guarda los cambios.

GitHub Pages tardará unos minutos en publicar tu sitio. Cada vez que realices cambios, ejecuta nuevamente `npm run deploy` para actualizar la versión en línea.

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── tabs/         # Tab content components
│   │   ├── Header.tsx    # Site header
│   │   ├── Footer.tsx    # Site footer
│   │   └── ...
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── ...
```

## 🎨 Customization

### Theme Colors
The color scheme can be customized in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'md-bg': {
        light: '#ffffff',
        dark: '#0d1117',
      },
      // ... other color configurations
    }
  }
}
```

### Content
Update the content in the respective components under `src/components/tabs/` to customize your portfolio information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/portfolio/issues).

## 👤 Author

**Leandro Cardozo**
- GitHub: [@leanczo](https://github.com/leanczo)
- LinkedIn: [leanczo](https://linkedin.com/in/leanczo/)

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📝 Acknowledgments

- GitHub Markdown CSS for the styling inspiration
- Lucide for the beautiful icons
- All contributors who help improve this project