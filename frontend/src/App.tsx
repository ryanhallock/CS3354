import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import MyFlashcards from "@/pages/MyFlashcards";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Create from "@/pages/Create";
import StudyView from "@/pages/StudyView";

function App() {
  return (
    <div className="min-h-screen bg-surface text-text font-sans">
      <Header />
      
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/myflashcards" element={<MyFlashcards />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study" element={<StudyView />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
