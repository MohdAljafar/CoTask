# Collaborative Todo App

A full-stack collaborative task management application built with the MERN stack. Users can create workspaces, invite members, manage tasks, and collaborate in real time through Socket.IO.

## 🚀 Features

### Authentication
- User Registration & Login
- JWT-based Authentication
- Protected Routes

### Workspace Management
- Create Workspaces
- Join Collaborative Workspaces
- Invite Members via Email
- View Workspace Members
- Workspace Owner Controls
- Delete Workspace (Owner Only)

### Task Management
- Create Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed
- Real-Time Task Synchronization

### Real-Time Collaboration
- Instant Task Updates
- Live Workspace Collaboration
- Socket.IO Integration

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs

## 📂 Project Structure

```
project-root/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── hooks/
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── socket/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/MohdAljafar/CoTask.git
cd CoTask
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:5000
```

## 🔑 Environment Variables

### Server

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

## 📸 Screenshots

### Dashboard

![Dashboard](/screenshots/dashboard.jpg)

### Workspace

![Workspace](/screenshots/workspace.jpg)

## 🔄 Workflow

1. Register/Login
2. Create a Workspace
3. Invite Team Members
4. Create and Manage Tasks
5. Collaborate in Real Time
6. Workspace Owner can Delete Workspace

## 🎯 Future Improvements

- Task Assignment
- Due Dates
- Notifications
- Activity Logs
- File Attachments
- Workspace Roles (Admin/Member)
- Drag & Drop Kanban Board

## 📈 Learning Outcomes

- MERN Stack Development
- REST API Design
- JWT Authentication
- MongoDB Data Modeling
- Real-Time Communication with Socket.IO
- Team Collaboration Features
- Full-Stack Application Architecture

## 👨‍💻 Author

Mohd Aljafar

IIT Delhi | Software Development | MERN Stack | DSA

---