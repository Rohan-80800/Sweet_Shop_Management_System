# 🍭 Sweet Haven

## 🏪 A Full‑Stack Sweet Shop Management System

🚀 **A modern, scalable, and role‑based sweet shop platform built with TDD principles**

---

## ✨ Live Demo

🌐 **Frontend (Render)**
👉 [https://sweet-shop-sxg5.onrender.com](https://sweet-shop-sxg5.onrender.com/)

🔗 **Backend (Render)**
👉 [https://sweet-shop-management-system-7bkb.onrender.com](https://sweet-shop-management-system-7bkb.onrender.com)

---

## 🎯 Project Overview

**Sweet Haven** is a complete **Sweet Shop Management System** designed to manage inventory, purchases, and administration of sweets with a clean UI and secure backend.

Users can:

🍬 Browse available sweets

🛒 Purchase sweets (stock updates in real time)

🔍 Search sweets by name, category, or price

👤 Register & login securely using JWT auth

Admins can:

🧁 Add new sweets

✏️ Update sweet details

🗑️ Delete sweets

📦 Restock inventory

Built strictly following **TDD Kata guidelines** with clean architecture and modern tooling.

---

## 🖼️ Screenshots
<img width="1919" height="910" alt="Screenshot 2025-12-13 105811" src="https://github.com/user-attachments/assets/3d197c73-0d2f-4342-a854-1ec658cd4e82" />
<img width="1914" height="910" alt="Screenshot 2025-12-13 105842" src="https://github.com/user-attachments/assets/4839d6a0-583e-473f-80eb-13b283084e30" />
<img width="1919" height="911" alt="Screenshot 2025-12-15 201451" src="https://github.com/user-attachments/assets/aa385cc3-8362-459d-b4da-4cda5dbd4027" />
<img width="1904" height="905" alt="Screenshot 2025-12-15 201523" src="https://github.com/user-attachments/assets/6942673a-8a5d-4aa6-a290-2c58245f74bf" />



---

## 🧩 Tech Stack

## 🖥️ Frontend

⚛️ React (Vite)

🎨 Tailwind CSS + Radix UI

🧠 Redux Toolkit (Global State)

🔄 React Router DOM

📡 Axios (API communication)

🤖 **Lovable AI** — UI generation & layout assistance

🚀 Deployed on **Render**

---

## 🛠️ Backend

🟢 Node.js + Express.js

🍃 MongoDB + Mongoose

🔐 JWT Authentication + Cookies

📷 Cloudinary (Image Uploads)

📦 Multer (File handling)

🔄 CORS + Secure Cookies

🧪 Built with **TDD mindset**

🤖 **Grok AI** — route & boilerplate generation

🤖 **ChatGPT** — debugging & error resolution

🚀 Deployed on **Render**

---

## 🗂️ Project Structure

```bash
📦 sweet-haven
├── 📁 frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
└── 📁 backend
    ├── controllers
    ├── routes
    ├── models
    ├── middlewares
    ├── index.js
    └── .env
```

---

## 🔐 Authentication & Authorization Flow

1️⃣ User registers or logs in

2️⃣ Backend validates credentials

3️⃣ JWT token issued & stored via cookies

4️⃣ Protected routes secured via middleware

5️⃣ Admin‑only routes enforced by role checks

---

## 🍬 API Endpoints

### 🔑 Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/auth/signout
```

---

### 🍭 Sweet Routes (Protected)

```http
POST   /api/sweets          → Add new sweet (Admin)
GET    /api/sweets          → View all sweets
GET    /api/sweets/search   → Search sweets
PUT    /api/sweets/:id      → Update sweet (Admin)
DELETE /api/sweets/:id      → Delete sweet (Admin)
```

---

### 📦 Inventory Routes (Protected)

```http
POST /api/sweets/:id/purchase → Purchase sweet
POST /api/sweets/:id/restock  → Restock sweet (Admin)
```

---

## ⚙️ Run Locally

### 🟢 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
FRONTEND_URL=http://localhost:5173
```

---

### 🔵 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` in frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Deployment

### 🟢 Backend (Render)

✔ Web Service
✔ Build: `npm install`
✔ Start: `npm start`
✔ Env vars configured securely

---

### 🔵 Frontend (Render)

✔ Root directory: `frontend`
✔ Build: `npm run build`
✔ Output: `dist`
✔ SPA routing enabled

---

## 🧪 Test‑Driven Development (TDD)

🟥 Write failing tests
🟩 Implement minimal logic
🔁 Refactor for clarity & quality

✔ Clean commits following **Red → Green → Refactor**
✔ Focus on maintainability & SOLID principles

---

## 🤖 My AI Usage

I actively and responsibly used AI tools throughout this project:

### 🧠 Tools Used

🤖 **Lovable AI**
• Generated frontend UI layouts and component structure

🤖 **Grok AI**
• Helped scaffold backend routes and boilerplate

🤖 **ChatGPT**
• Debugged errors
• Fixed authentication & CORS issues
• Improved architecture and best practices

### ✨ Reflection

AI significantly boosted productivity by reducing boilerplate time and accelerating debugging. However, **all business logic, architecture decisions, and refinements were fully understood and manually validated by me**.

---

## 🌟 Features Implemented

## 🌟 Features Implemented

✅ JWT Authentication & Role‑based Access

✅ Admin & User separation

✅ Sweet inventory management

✅ Purchase & restock flow

✅ Image uploads via Cloudinary

✅ Responsive & modern UI

✅ Secure cookies & CORS setup

✅ Clean code & scalable structure

## 🛠️ Improvements Possible

✨ Payment gateway integration

✨ Order history & invoices

✨ Analytics dashboard

✨ Unit & integration tests expansion

✨ Dark mode toggle

---

## ❤️ Author

**Rohan Shete**
🚀 Full‑Stack Developer
⚛️ React | 🟢 Node.js | 🍃 MongoDB | 🔐 Auth | 🤖 AI‑Driven Development

---

> *"Code with sweetness, scale with structure 🍬"*
