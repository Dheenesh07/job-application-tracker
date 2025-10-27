# MERN Job Application Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application to create, view, update, and delete your job applications.

This project was built as a full-stack assessment to demonstrate complete CRUD operations, frontend/backend validation, and effective project structure.

---

## 🌐 Live Deployment

* **Live Frontend (GitHub Pages):** https://Dheenesh07.github.io/job-application-tracker/
* **Live Backend (Render):** https://job-application-tracker-q80u.onrender.com

---

## ✨ Features

* **Full CRUD:** Create, Read, Update, and Delete job applications.
* **Backend Validation:** Secure validation on the server using Mongoose.
* **Frontend Validation:** Client-side validation for a responsive user experience.
* **Responsive UI:** A clean, responsive card-based layout.
* **Single-Page-View:** A dedicated page to view the details of a single application.

---

## 🚀 Running the Project Locally

To run this project on your local machine, you will need to run the frontend and backend in two separate terminals.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18 or newer)
* [Git](https://git-scm.com/)
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account to get a database connection string.

### 1. Clone the Repository

```bash
git clone [https://github.com/Dheenesh07/job-application-tracker.git](https://github.com/Dheenesh07/job-application-tracker.git)
cd job-application-tracker

2. Configure Backend & Frontend
You will need two terminals open for these steps.

Terminal 1: Setup Backend

# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file
# (On Windows: type NUL > .env)
# (On Mac/Linux: touch .env)

After creating the file, open backend/.env and add your MongoDB connection string and port:MONGO_URI=mongodb+srv://<your-username>:<your-password>@...
PORT=5000

Note: You must get your MONGO_URI from your MongoDB Atlas dashboard. Make sure to whitelist all IP addresses (0.0.0.0/0) in the "Network Access" tab on Atlas.

Terminal 2: Setup Frontend

# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

3. Run the Application
Now, run both servers at the same time.

In your Terminal 1 (inside the /backend folder):

npm run dev
# Your server should be running on http://localhost:5000

In your Terminal 2 (inside the /frontend folder):

npm run dev
# Your React app will open in your browser, e.g., http://localhost:5173


📦 API Endpoints
The backend server provides the following RESTful API endpoints, all prefixed with /api.

Method   Endpoint    Description

POST     /jobs       Create a new job application.
GET      /jobs       Get a list of all job applications.
GET      /jobs/:id   Get details for a single job by its ID.
PUT      /jobs/:id   Update an existing job application by its ID.
DELETE   /jobs/:id   Delete a job application by its ID.