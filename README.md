# 🌍 **GeoVerse - The Ultimate Travel Guessing Game**  

GeoVerse is a fun and interactive travel guessing game where players receive cryptic clues about famous places and must guess the correct destination. If they guess correctly, they unlock fun facts, trivia, and surprises about the location!  

<img width="1469" alt="Screenshot 2025-03-02 at 6 08 12 PM" src="https://github.com/user-attachments/assets/858fe2ca-3cc9-44c7-b15c-c3b57dddf2ad" />

## 🚀 **Features**  

✅ **Engaging Gameplay**: Players receive 1-2 cryptic clues about a destination and must choose the correct answer.  
✅ **Instant Feedback**:  
   - 🎉 Correct Answer → Confetti animation + fun fact.  
   - 😢 Incorrect Answer → Sad-face animation + a hint for the next round.  
✅ **Score Tracking**: Users can track their correct and incorrect answers.  
✅ **Challenge a Friend**: Invite friends via a shareable link. The invited friend can see your score before playing.  
✅ **Authentication**: Users can **Sign Up / Log In** to save progress.  
✅ **Responsive Design**: Built with **Pixel-RetroUI** for a retro-gaming aesthetic.  

---

## 🛠 **Tech Stack**  

- **Frontend**: React, TypeScript, Tailwind CSS, Pixel-RetroUI  
- **State Management**: React Context API  
- **Form Validation**: React Hook Form + Zod  
- **Backend**: Node.js, Express (to store and retrieve destination data)  
- **Database**: MongoDB
- **AI Integration**: OpenAI API (for dataset expansion and trivia generation)  

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

## 🔗 **API Endpoints**  

| Method | Endpoint       | Description                          |
|--------|---------------|--------------------------------------|
| `GET`  | `/api/clues`  | Fetches random destination clues    |
| `POST` | `/api/guess`  | Checks if the user’s answer is correct |
| `POST` | `/api/auth/register` | User Registration |
| `POST` | `/api/auth/login`    | User Login |

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
