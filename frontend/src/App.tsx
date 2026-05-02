import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Create from "@/pages/Create";
import Edit from "@/pages/Edit";
import Home from "@/pages/Home";
import MyFlashcards from "@/pages/MyFlashcards";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Settings from "@/pages/Settings";
import StudyView from "@/pages/StudyView";

function App() {
  const { user } = useAuth();
  const { settings } = useSettings(!!user);

  useEffect(() => {
    if (settings?.textSize) {
      document.documentElement.setAttribute(
        "data-text-size",
        settings.textSize.replace("_", "-").toLowerCase(),
      );
    }
  }, [settings?.textSize]);

  useEffect(() => {
    if (settings?.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme.toLowerCase());
    }
  }, [settings?.theme]);

  // Remove data attributes when logged out
  useEffect(() => {
    if (!user) {
      document.documentElement.removeAttribute("data-text-size");
      document.documentElement.removeAttribute("data-theme");
    }
  }, [user]);

  return (
    <div className="bg-surface text-text min-h-screen font-sans">
      <Header />

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/myflashcards" element={<MyFlashcards />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/study" element={<StudyView />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
