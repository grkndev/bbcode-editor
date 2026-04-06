# BBCode Editor

A modern, feature-rich BBCode editor built with Next.js. Write and preview BBCode in real time — try it live at [bbcode.grkn.dev](https://bbcode.grkn.dev).

![BBCode Editor](https://bbcode.grkn.dev/image.png)

---

## ✨ Features

- **Live Preview** — See your BBCode rendered in real time as you type
- **Toolbar** — One-click formatting for bold, italic, underline, strikethrough, and more
- **Image Import** — Insert images via URL with built-in validation
- **Code Blocks** — Syntax-highlighted code tag support
- **Color & Size** — Font color and size controls via toolbar
- **Keyboard Friendly** — Tag insertion works seamlessly with keyboard shortcuts
- **Responsive UI** — Works on desktop and mobile browsers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Hugeicons](https://hugeicons.com/) |
| Styling | Tailwind CSS |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/grkndev/bbcode-editor.git
cd bbcode-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
bbcode-editor/
├── app/                  # Next.js App Router pages
├── components/
│   ├── ui/               # shadcn/ui base components
│   └── editor/           # BBCode editor components
├── lib/                  # Utility functions & BBCode parser
├── public/               # Static assets
└── styles/               # Global styles
```

---

## 🌐 Live Demo

You can try the editor without installing anything at:

**[bbcode.grkn.dev](https://bbcode.grkn.dev)**

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and that the project builds without errors before submitting a PR.

---

## 🐛 Bug Reports

Found a bug? Please open an [issue](https://github.com/grkndev/bbcode-editor/issues) and include:

- What you expected to happen
- What actually happened
- Steps to reproduce

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made by <a href="https://github.com/grkndev">grkndev</a>
</p>