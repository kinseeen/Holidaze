# 🚀 Holidaze

A modern web application built with **React**, **TypeScript**, and **Tailwind CSS**.  
This project is designed with scalability and maintainability in mind, providing a clean and developer-friendly setup out of the box.

---

## 📦 Tech Stack

- ⚛️ [React](https://react.dev/) – UI library
- 📘 [TypeScript](https://www.typescriptlang.org/) – Static typing
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- 🛠️ [Vite](https://vitejs.dev/) – Build tool & dev server
- ✅ [Prettier](https://prettier.io/) – Code quality and formatting

---

## 🗂️ Project Structure

project-root/
│── src/
│ ├── assets/ # Static assets (images, fonts, etc.)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── hooks/ # Custom React hooks
│ ├── App.tsx # Root component
│ └── main.tsx # Entry point
│
│── public/ # Public static files
│── tailwind.config.js # Tailwind configuration
│── tsconfig.json # TypeScript configuration
│── vite.config.ts # Vite configuration (if using Vite)
│── package.json


---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project

2. Install dependencies

Using npm:

npm install

Or with yarn:

yarn install

Or with pnpm:

pnpm install

3. Run the development server

npm run dev

This will start a local server at:

👉 http://localhost:5173

(default for Vite)
4. Build for production

npm run build

The output will be in the dist/ folder.
5. Preview the production build

npm run preview

🧪 Linting & Formatting

Run ESLint:

npm run lint

Format code with Prettier:

npm run format

🛠️ Tailwind CSS

Tailwind is configured in tailwind.config.js.
To customize your theme, edit the extend section. Example:

theme: {
  extend: {
    colors: {
      brand: "#1DA1F2",
    },
  },
}

✅ Scripts

Here are the common scripts defined in package.json:
Command	Description
npm run dev	Start development server
npm run build	Build production-ready files
npm run preview	Preview production build
npm run lint	Run ESLint checks
npm run format	Format code with Prettier

