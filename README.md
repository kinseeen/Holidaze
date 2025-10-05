# Holidaze

This project is created as my final exam for Frontend development with Noroff. 

## 🏖️ Project Overview
The aim of the project is to create a booking platform called Holidaze.
The site is a booking website where the users can explore, book and manage bookings at different venues. 
There are three main roles: 

 - **Visitors**: Can browse venues, search for venues, view available dates for venues and register as a user. 
 - **User**:  Can browse venues, search for venues, view available dates for venues and book venues.
- **Venue manager**: Create, edit and delete venues and view upcoming bookings. 

The app interacts with the [Noroff Holidaze API](https://docs.noroff.dev/docs/v2) for data management.

---

This project has been buildt with **React**, **TypeScript**, and **Tailwind CSS**.

---
## Features
- User authentication (register, login, logout)
- Browse all venues with search and filtering
- View venue details and availability
- Create and manage bookings
- Create, update, and delete venues (for managers)
- Responsive design with Tailwind CSS


## 📦 Tech Stack

- ⚛️ [React](https://react.dev/) – UI library
- 📘 [TypeScript](https://www.typescriptlang.org/) – Static typing
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- 🛠️ [Vite](https://vitejs.dev/) – Build tool & dev server
- ✅ [Prettier](https://prettier.io/) – Code quality and formatting

---



## To use this project you will ned Node.js with NPM or Yarm installed. 

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

---

## 🚀 Deployment
Live demo: https://holidazeprojectexam.netlify.app/

