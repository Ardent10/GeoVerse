
# 🌍 **GeoVerse - The Ultimate Travel Guessing Game**  

GeoVerse is an interactive travel guessing game where players receive cryptic clues about famous places and must guess the correct destination. If they guess correctly, they unlock fun facts, trivia, and surprises about the location!  

<img width="1469" alt="Screenshot 2025-03-02 at 6 08 12 PM" src="https://github.com/user-attachments/assets/858fe2ca-3cc9-44c7-b15c-c3b57dddf2ad" />

---

## 🚀 **Features**  

✅ **Engaging Gameplay**: Players receive cryptic clues about a destination and must guess the correct answer.  
✅ **Instant Feedback**:  
   - 🎉 **Correct Answer** → Confetti animation + Fun Fact.  
   - 😢 **Incorrect Answer** → Sad-face animation + a hint for the next round.  
✅ **Dynamic Globe** 🌍: Interactive 3D globe rendering using `globe.gl` to show guessed locations.  
✅ **Score Tracking**: Users can track their correct and incorrect answers.  
✅ **Challenge a Friend**: Invite friends via a shareable link. The invited friend can see your score before playing.  
✅ **Authentication**: Users can **Sign Up / Log In** to save progress.  
✅ **Trivia & Fun Facts**: Each guessed location unlocks interesting facts and trivia about the place.  
✅ **Sound Effects** 🔊: Win & Lose sound effects (`/sounds/win.mp3`, `/sounds/loose.mp3`).  
✅ **Responsive Design**: Built with **Pixel-RetroUI** for a retro-gaming aesthetic.  

---

## 🛠 **Tech Stack**  

- **Frontend**: React, TypeScript, Tailwind CSS, Pixel-RetroUI  
- **State Management**: React Context API  
- **3D Globe Rendering**: `globe.gl`  
- **Form Validation**: React Hook Form + Zod  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT-based Auth  
- **API Integration**: OpenAI API (for dataset expansion and trivia generation)  

---

## 🎮 **Getting Started**  

### 1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/Ardent10/geoverse.git
cd geoverse
```

### 2️⃣ **Install Dependencies**  
```bash
pnpm install
```

### 3️⃣ **Run the Development Server**  
```bash
pnpm run dev
```

The app will be available at **`http://localhost:5173`**.

---

## 🔐 **Environment Setup**

### Frontend Environment Variables (.env)
Create a `.env` file in the frontend root directory with these variables:
```
VITE_BASE_URL=http://localhost:5000 # or your backend URL
VITE_NASA_API_KEY=your_nasa_api_key # for satellite imagery
```

### Backend Environment Variables (.env)
Create a `.env` file in the backend root directory with these variables:
```
MONGODB_URI=mongodb://localhost:27017/geoverse # or your MongoDB connection string
DB_NAME=geoverse # your database name
PORT=5000 # port for your backend server
JWT_SECRET=your_secure_random_string # secret for JWT token generation
```

### 🔑 **Getting API Keys**

1. **NASA API Key**: 
   - Visit [NASA API Portal](https://api.nasa.gov/)
   - Complete the form to get your API key
   - Add the key to your frontend .env file

2. **MongoDB Setup**:
   - Use a local MongoDB instance or 
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string and add it to the backend .env file

### ⚠️ **Important Notes**

- **Never commit .env files to your repository**
- Add `.env` and `.env.local` to your `.gitignore` file
- For production, set these environment variables in your hosting platform

---

## 🔗 **API Endpoints**  

### 🔑 **Auth Routes**
| Method | Endpoint          | Description                    |
|--------|------------------|--------------------------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & return token |
| `GET` | `/api/auth/profile` | Get user profile (requires auth) |

### 🏙 **City Routes**  
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| `GET`  | `/api/cities/`  | Fetch all cities |
| `GET`  | `/api/cities/random`  | Fetch a random city |
| `GET`  | `/api/cities/:city` | Fetch details of a specific city |
| `POST` | `/api/cities/quiz/answer` | Submit an answer & validate it |

### 🌎 **Game Routes**  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/game/countries` | Fetch all available countries |
| `GET`  | `/api/game/clue/:country/:clueIndex` | Fetch a clue for a specific country |
| `POST` | `/api/game/submit-answer` | Submit user's answer & get feedback |
| `GET`  | `/api/game/fun-fact/:city` | Fetch a fun fact and trivia for a city |

---

## 🗺 **Rendering the Globe 🌍**  

The game includes an **interactive 3D globe** that renders guessed locations dynamically.  

### ✅ **Using `globe.gl` for Visualization**  
We use `globe.gl` to display guessed cities.  


The `guessedCities` state will update with each correct guess, dynamically updating the **globe visualization**.

---

## 🎵 **Adding Sound Effects**  

- **Win Sound (`win.mp3`)**: Played when the user guesses correctly.  
- **Lose Sound (`loose.mp3`)**: Played when the user guesses incorrectly.  

---

## 🤝 **Contributing**  

We welcome contributions! To contribute:  

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Open a Pull Request 🚀  

---

## 📜 **License**  

This project is licensed under the **MIT License**.  

---

## 🌟 **Show Your Support**  

If you liked this project, don’t forget to ⭐ **star the repo** and share it with others!  
