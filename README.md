# 🎬 Movie Ticket Booking System

A full-stack **Movie Ticket Booking Web Application** built using **Node.js, Express, MongoDB, and EJS**.  
This project allows users to register, login, browse movies, view shows, and book movie tickets with a clean UI and proper backend structure.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- View available movies
- View movie details
- Book movie tickets
- View booked ticket details
- User profile page

### 🛠️ Admin Features
- Admin dashboard
- Manage movies
- Manage screens & theaters
- Manage shows
- View ticket bookings

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

## 📂 Project Structure

```bash
TICKETBOOKING/
│
├── config/
│   └── db.js                 # Database connection
│
├── middleware/
│   └── authMiddleware.js     # Authentication middleware
│
├── models/
│   ├── Movie.js
│   ├── Screen.js
│   ├── Show.js
│   ├── Theater.js
│   ├── Ticket.js
│   └── User.js
│
├── public/
│   ├── css/                  # Stylesheets
│   └── images/               # Images & assets
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── movieRoutes.js
│   ├── profileRoutes.js
│   ├── showRoutes.js
│   └── ticketRoutes.js
│
├── views/
│   ├── admin/                # Admin views
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── movieDetails.ejs
│   ├── profile.ejs
│   └── ticket.ejs
│
├── .env                      # Environment variables
├── app.js                    # Main application file
├── seed.js                   # Sample data seeding
├── package.json
├── package-lock.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/pragati-1112/MovieTicket_Booking_node.git
2️⃣ Go to project directory
cd ticketbooking
3️⃣ Install dependencies
npm install
4️⃣ Configure Environment Variables
Create a .env file and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string
5️⃣ Run the application
node app.js
6️⃣ Open in browser
http://localhost:3000
🌱 Future Enhancements
🎫 Seat selection system

📱 Mobile responsive UI

📊 Advanced admin analytics

👩‍💻 Author
Pragati Ahir
IT Student | Full Stack Developer
💡 Passionate about building real-world web applications using MERN stack
