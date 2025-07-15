# 🏆 Leaderboard Web Application

A full-stack **Leaderboard Web Application** built with the MERN stack.
It allows users to:

* View a dynamic leaderboard.
* Claim reward points (with celebration popup).
* View detailed claim history.
* Add new users.
* See top 3 users highlighted with medals.
* Paginate through the leaderboard.

---

## 🚀 Features

✅ **Leaderboard with Top 3 highlights**

* Top 3 users are displayed with gold 🥇, silver 🥈, and bronze 🥉 medals.

✅ **Pagination**

* Shows 6 users per page to keep the UI clean.

✅ **Claim Points**

* Users can claim points, triggering a confetti-like celebration popup.

✅ **View History**

* View a user’s detailed claim history with timestamps.

✅ **Add New Users**

* Admin can easily add new users via a modal form.

✅ **Coins Icon & Responsive UI**

* Points are displayed with a coin icon, giving a rewarding look.

✅ **Fully Responsive**

* Works seamlessly on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

| Layer          | Tech                                       |
| -------------- | ------------------------------------------ |
| **Frontend**   | React.js, Tailwind CSS, Headless UI Dialog |
| **Backend**    | Node.js, Express.js                        |
| **Database**   | MongoDB (via Mongoose)                     |
| **API Client** | Axios                                      |

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/leaderboard-app.git
cd leaderboard-app
```

---

### 2️⃣ Install dependencies

#### Install server dependencies

```bash
cd server
npm install
```

#### Install client dependencies

```bash
cd ../client
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in your **`server`** directory:

```bash
cd ../server
touch .env
```

Add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/leaderboard
PORT=5000
```

---

### 4️⃣ Run the app

#### Run the backend server

```bash
cd server
npm start
```

#### Run the frontend React app

```bash
cd ../client
npm start
```

Now open [http://localhost:8000](http://localhost:8000) to see the app in action.

---

## 📁 Project Structure

```
leaderboard-app/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## 📝 API Endpoints

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/users`           | Get leaderboard users   |
| POST   | `/users`           | Add new user            |
| POST   | `/points/:userId`  | Claim points for a user |
| GET    | `/history/:userId` | Get point claim history |

---

## 🚀 Deployment

✅ Can be easily deployed on **Render / Vercel / Railway**.

If you want, I can also write you a `Procfile` and instructions for deploying on **Heroku** or **Render**.

---

## 👨‍💻 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## ✨ Credits

* Built with ❤️ by **[Irfan ANsari](https://github.com/iRfAn-AnSaRi0)**.
* UI inspiration from real gaming leaderboards.
