import { Routes, Route } from "react-router";
import { Home } from "./modules/home/page";
import { LoginPage, SignupPage } from "./modules/auth";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
