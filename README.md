# 🐾 Pet Adoption & Rescue Platform

A full-stack **MERN web application** designed to connect people with pets available for adoption and provide a simple platform for pet listings, favorites, and adoption requests.

## 🚀 Features

* 🔐 User Registration & Login
* 🐶 Browse Available Pets
* 🔎 Search and Filter Pets
* ❤️ Add Pets to Favorites
* 📝 Submit Adoption Requests
* 👤 User Profile Management
* 🛡️ Admin Management
* 📷 Pet Image Upload
* 🔒 JWT Authentication
* ☁️ Cloudinary Image Storage
* 🗄️ MongoDB Database
* 📱 Responsive React Interface

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* bcryptjs
* Multer

### Database & Cloud

* MongoDB
* Mongoose
* Cloudinary

## 📁 Project Structure

```text
Pet-Adoption/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Pet-Adoption
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Do not upload your `.env` file to GitHub.

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal.

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
