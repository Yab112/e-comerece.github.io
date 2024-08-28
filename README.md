
<h1 align="center">YabStore E-commerce Website</h1>

## Project Overview

<p>
YabStore is a modern e-commerce platform designed to provide a seamless online shopping experience. The platform includes both frontend and backend implementations, featuring user authentication, product browsing, cart management, and order processing.
</p>

## Screenshots

### Home Page

<p align="center">
  <img src="./ScreenShoot/Screenshot 2024-08-28 124456.png" alt="Home Page" width="800px">
</p>

### Product Page

<p align="center">
  <img src="./ScreenShoot/Screenshot 2024-08-28 124506.png" alt="Home Page" width="800px">
</p>

### Cart Page

<p align="center">
  <img src="./ScreenShoot/Screenshot 2024-08-28 124404.png" alt="Home Page" width="800px">
</p>

### Order page
<p align="center">
  <img src="./ScreenShoot/Screenshot 2024-08-28 124347.png" alt="Home Page" width="800px">
</p>

### Payment Page
<p align="center">
  <img src="./ScreenShoot/Screenshot 2024-08-28 124434.png" alt="Home Page" width="800px">
</p>

## Table of Contents

<ul>
  <li><a href="#project-overview">Project Overview</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#tech-stack">Tech Stack</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#running-the-project">Running the Project</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li><a href="#available-scripts">Available Scripts</a></li>
  <li><a href="#license">License</a></li>
</ul>

## Features

<ul>
  <li><strong>User Authentication:</strong> Secure user login and registration.</li>
  <li><strong>Product Management:</strong> Browse and view detailed information about products.</li>
  <li><strong>Cart Functionality:</strong> Add, remove, and update products in the cart.</li>
  <li><strong>Order Processing:</strong> Place orders and manage order history.</li>
  <li><strong>Responsive Design:</strong> Optimized for both desktop and mobile devices.</li>
</ul>

## Tech Stack

### Frontend

<ul>
  <li><strong>React:</strong> A JavaScript library for building user interfaces.</li>
  <li><strong>React Router:</strong> Declarative routing for React apps.</li>
  <li><strong>Tailwind CSS:</strong> A utility-first CSS framework.</li>
  <li><strong>Axios:</strong> Promise-based HTTP client for making API requests.</li>
  <li><strong>Radix UI:</strong> Accessible, unstyled components for building high-quality design systems and web apps.</li>
  <li><strong>React Toastify:</strong> Notifications for React apps.</li>
</ul>

### Backend

<ul>
  <li><strong>Node.js:</strong> A JavaScript runtime built on Chrome's V8 engine.</li>
  <li><strong>Express:</strong> A fast, unopinionated, minimalist web framework for Node.js.</li>
  <li><strong>MongoDB:</strong> A NoSQL database for storing user data and product information.</li>
  <li><strong>Mongoose:</strong> An elegant MongoDB object modeling tool for Node.js.</li>
  <li><strong>JWT (JSON Web Tokens):</strong> For secure user authentication.</li>
  <li><strong>Stripe:</strong> For handling payments and order processing.</li>
  <li><strong>Multer:</strong> Middleware for handling file uploads.</li>
</ul>

## Installation

### Prerequisites

<ul>
  <li><strong>Node.js:</strong> Ensure that Node.js is installed on your machine.</li>
  <li><strong>MongoDB:</strong> A running instance of MongoDB.</li>
</ul>

### Clone the Repository

```bash
git clone https://github.com/yourusername/yabstore-ecommerce.git
cd yabstore-ecommerce
```

### Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

## Running the Project

### Backend

<ol>
  <li>Create a <code>.env</code> file in the <code>backend</code> directory and configure your environment variables (e.g., MongoDB URI, JWT secret, etc.).</li>
  <li>Start the server:</li>
</ol>

```bash
cd backend
npm run server
```

### Frontend

<ol>
  <li>Start the development server:</li>
</ol>

```bash
cd frontend
npm run dev
```

<ol>
  <li>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a>.</li>
</ol>

## Project Structure

<pre>
yabstore-ecommerce/
│
├── frontend/              # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API for state management
│   │   ├── App.jsx        # Main application component
│   │   ├── index.js       # Entry point
│   │   └── ...            # Other configurations
│   └── package.json       # Frontend dependencies and scripts
│
├── backend/               # Backend application
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies and scripts
│
├── README.md              # Project documentation
└── .gitignore             # Git ignore file
</pre>

## Available Scripts

### Frontend

<ul>
  <li><code>npm run dev</code>: Starts the development server.</li>
  <li><code>npm run build</code>: Builds the app for production.</li>
  <li><code>npm run lint</code>: Runs ESLint for linting code.</li>
  <li><code>npm run preview</code>: Previews the production build locally.</li>
</ul>

### Backend

<ul>
  <li><code>npm run server</code>: Starts the backend server using Nodemon.</li>
</ul>

## License

<p>
This project is licensed under the ISC License. See the <a href="LICENSE">LICENSE</a> file for more details.
</p>
```

