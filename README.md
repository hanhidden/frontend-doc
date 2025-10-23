# 📝 Real-Time Collaborative Document Editor

A web application for **real-time collaborative document editing**, built with **React**, **React Quill**, **Redux**, and **Socket.IO**, backed by **Strapi** or a REST API. Users can create, edit, and collaborate on documents in real time.

---

## 🌟 Features

- Create new documents with custom titles
- Edit document titles
- View a list of existing documents
- Real-time collaboration with multiple users
- text editor powered by React Quill
- Responsive design with Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** React, Redux, React Quill, Tailwind CSS  
- **Backend:** Strapi or custom REST API  
- **Realtime:** Socket.IO  
- **State Management:** Redux  
- **Deployment:** Vercel(frontend) + Render(backend)

---

## 📸 Screenshots


### Document Selection Page
![Document Selection](src\assets\screenshots\document-selection.png)

### Document Editor Page
![Document Editor](src\assets\screenshots\document-editor.png)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/real-time-collab-document.git
cd real-time-collab-document
```

### 2. install dependenceies 

```bash
npm install
```

### 3. Configure environment variables

use the .env file in the root directory:
```bash
VITE_BACKEND_URL=https://your-backend-url.com
```

### 4. Run the project
```bash
npm run dev
```
Open http://localhost:5173 in your browser.