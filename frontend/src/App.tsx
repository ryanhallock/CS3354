import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MyFlashcards from "./pages/MyFlashcards";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Create from "./pages/Create";
import StudyView from "./pages/StudyView";
import SetView from "./pages/SetView";

function App() {
  const [view, setView] = useState<"default" | "login" | "signup">("default");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const renderAuthForm = () => {
    const isSignup = view === "signup";

    return (
      <section id="auth-section">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          {isSignup && (
            <label>
              Confirm Password
              <input type="password" placeholder="••••••••" />
            </label>
          )}
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              setIsAuthenticated(true);
              navigate("/myflashcards");
            }}
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>
      </section>
    );
  };

  return (
    <>
      <header className="top-nav">
        <div className="logo">W.H.A.T.T</div>
        <div>
          {isAuthenticated ? (
            <>
              <button type="button" className="nav-btn" onClick={() => navigate("/myflashcards")}>My Flashcards</button>
              <button type="button" className="nav-btn" onClick={() => navigate("/search")}>Search</button>
              <button type="button" className="nav-btn" onClick={() => navigate("/create")}>Create</button>
              <button type="button" className="nav-btn" onClick={() => navigate("/profile")}>Profile</button>
              <button
                type="button"
                className="nav-btn"
                onClick={() => {
                  setIsAuthenticated(false);
                  setView("default");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" color="blue" onClick={() => setView("login")}>Login</button>
              <button type="button" className="nav-btn" onClick={() => setView("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="center">
                <div>
                  <h1 style={{ fontFamily: '"Lexend Exa", sans-serif', color: '#1C208A', fontWeight: 600, fontSize: 60, marginBottom: 35}}>W.H.A.T.T</h1>
                  <h2>We have a test tomorrow!</h2>
                </div>
              </section>

              {view === "default" ? (
                <section id="next-steps">
                  <div id="docs">
                    <h2>1. Upload your slideshow</h2>
                    <p>Watch AI transform it into interactive flashcards!</p>
                    <br />
                    <h2>2. Organize your sets by class or category</h2>
                    <p>Stay organized and find what you need quickly</p>
                    <br />
                    <h2>3. Study your own sets or search for others</h2>
                    <p>Memorize and learn effectively</p>
                  </div>
                </section>
              ) : (
                renderAuthForm()
              )}

              <div className="ticks"></div>
              <section id="spacer"></section>
            </>
          }
        />
        <Route path="/myflashcards" element={<MyFlashcards />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/study" element={<StudyView />} />
        <Route path="/setView" element={<SetView />} />
        <Route path="*" element={<MyFlashcards />} />
      </Routes>
    </>
  );
}

export default App;