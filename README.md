# 🎬 MovieZone-Angular

![Angular](https://img.shields.io/badge/Angular-16.2.16-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TMDB API](https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![Standalone](https://img.shields.io/badge/Standalone_Architecture-FF6B6B?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-Portfolio_Project-181717?style=for-the-badge&logo=github&logoColor=white)

## 📌 Project Overview

**MovieZone** is a modern movie streaming web application inspired by premium platforms like **Netflix**.

Built with **Angular 16 Standalone Components**, this project demonstrates real-world frontend engineering practices including:

- TMDB API Integration
- Authentication Flow
- Route Guards
- HTTP Interceptors
- Reactive Forms
- RxJS Live Search
- Favorites & Watchlist
- Responsive UI Design
- Reusable Component Architecture

---

## 🎥 Live Demo

🔗 Watch Project Demo:

https://youtu.be/tQ7GmLzInh4

---

## 🏗️ Architecture

User Browser  
⬇️  
Angular UI Components  
⬇️  
Services Layer  
⬇️  
HTTP Client + Interceptors  
⬇️  
TMDB API + LocalStorage

---

## 🛠️ Technologies Used

- Angular 16.2.16
- TypeScript
- RxJS
- Bootstrap 5.3.3
- Angular Router
- Reactive Forms
- Route Guards
- HTTP Interceptors
- TMDB API
- LocalStorage
- Git & GitHub

---

## 📁 Project Structure

~~~bash
MovieZone-Angular/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── shared/
│   │   │   └── components/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── environments/
│   │   └── environment.ts
│   │
│   └── assets/
│
├── angular.json
├── package.json
└── README.md
~~~

---

## ✨ Main Features

### 🎬 Movie Features

- Trending Movies
- Popular Movies
- Top Rated Movies
- Movie Details
- Similar Movies
- Search Movies
- Genre Filtering
- Sorting Options

### 🔐 Authentication

- Register Account
- Login System
- Fake JWT Authentication
- Protected Routes
- Logout Functionality

### ❤️ User Features

- Favorites List
- Watchlist
- User Profile
- Saved Statistics

### 🎨 UI / UX

- Dark Netflix Style Theme
- Responsive Layout
- Smooth Hover Effects
- Toast Notifications
- Global Loading Spinner
- Scroll To Top Button

---

## 🚀 Pages Included

### Public Pages

- Home
- Movies
- Trending
- Search
- Movie Details
- Login
- Register

### Protected Pages

- Favorites
- Watchlist
- Profile

### Utility Pages

- 404 Not Found

---

## ⚙️ Advanced Angular Concepts Used

### Standalone Architecture

- bootstrapApplication()
- app.config.ts
- No AppModule

### Routing

- Lazy Loaded Components
- Route Guards
- Wildcard Routing

### RxJS

- BehaviorSubject
- debounceTime
- distinctUntilChanged
- switchMap
- catchError
- tap

### Forms

- Reactive Forms
- Validators
- Confirm Password Validation

### Interceptors

- Auth Token Injection
- Global Loader
- Error Handling

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

~~~bash
git clone https://github.com/Mohamed-Mosad-98/MovieZone-Angular.git
cd MovieZone-Angular
~~~

### 2️⃣ Install Dependencies

~~~bash
npm install
~~~

### 3️⃣ Add TMDB API Key

Open:

~~~bash
src/environments/environment.ts
~~~

Replace:

~~~ts
tmdbApiKey: 'YOUR_API_KEY'
~~~

### 4️⃣ Run Project

~~~bash
ng serve
~~~

Visit:

~~~bash
http://localhost:4200/
~~~

---

## 📷 Screenshots

### 🔹 Register Page

<img width="1920" height="1080" alt="Register" src="https://github.com/user-attachments/assets/register-page" />

### 🔹 Login Page

<img width="1920" height="1080" alt="Login" src="https://github.com/user-attachments/assets/login-page" />

### 🔹 Home Page

<img width="1920" height="1080" alt="Home" src="https://github.com/user-attachments/assets/home-page" />

### 🔹 Successful Login Toast

<img width="1920" height="1080" alt="Toast" src="https://github.com/user-attachments/assets/login-toast" />

---

## 🎯 Skills Demonstrated

- Angular Frontend Development
- SPA Architecture
- API Integration
- Authentication Flow
- State Management with RxJS
- Reusable Components Design
- Route Protection
- Responsive Web Design
- Debugging & Problem Solving
- Git Version Control

---

## 💼 Why This Project Matters

This project reflects practical hands-on experience with technologies commonly required in:

- Frontend Developer Roles
- Angular Developer Roles
- SPA Enterprise Applications
- Modern Web Development
- UI Engineering

---

## 👨‍💻 Author

**Mohamed Mosad**

🔗 GitHub: https://github.com/Mohamed-Mosad-98

🔗 LinkedIn: https://www.linkedin.com/in/mohamed-mosad-fahmy/

---

## ⭐ Support

If you like this project, give it a **Star** on GitHub ⭐
