import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyFlashcards from "./pages/MyFlashcards";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Create from "./pages/Create";
import StudyView from "./pages/StudyView";

async function authRequest(path: string, body: object) {
  const res = await fetch(`/api/auth${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data;
}

function App() {
  const [view, setView] = useState<"default" | "login" | "signup">("default");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ u, p }: { u: string; p: string }) =>
      authRequest("/login", { username: u, password: p }),
    onSuccess: () => {
      setIsAuthenticated(true);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/myflashcards");
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ u, p }: { u: string; p: string }) =>
      authRequest("/register", { username: u, password: p }),
    onSuccess: (_data, vars) => {
      loginMutation.mutate({ u: vars.u, p: vars.p });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () =>
      fetch("/api/auth/logout", { method: "POST", credentials: "include" }).then(() => {}),
    onSettled: () => {
      setIsAuthenticated(false);
      setView("default");
      navigate("/");
    },
  });

  const isSignup = view === "signup";
  const authError = registerMutation.error?.message ?? loginMutation.error?.message ?? "";

  const handleAuthSubmit = () => {
    if (isSignup && password !== confirmPassword) return;
    if (isSignup) {
      registerMutation.reset();
      loginMutation.reset();
      registerMutation.mutate({ u: username, p: password });
    } else {
      loginMutation.reset();
      loginMutation.mutate({ u: username, p: password });
    }
  };

  const handleLogout = () => logoutMutation.mutate();

  const renderAuthForm = () => {
    const isSignup = view === "signup";

    return (
      <section className="border border-border rounded-[10px] mx-auto my-5 max-w-[520px] p-5 text-left bg-surface">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {authError && <p style={{ color: "red" }}>{authError}</p>}
        {isSignup && password !== confirmPassword && confirmPassword && (
          <p style={{ color: "red" }}>Passwords do not match</p>
        )}
        <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); handleAuthSubmit(); }}>
          <label className="flex flex-col font-medium text-text">
            Username
            <input
              className="mt-1.5 px-[10px] py-2 border border-border rounded-md bg-surface text-heading"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-medium text-text">
            Password
            <input
              className="mt-1.5 px-[10px] py-2 border border-border rounded-md bg-surface text-heading"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {isSignup && (
            <label className="flex flex-col font-medium text-text">
              Confirm Password
              <input
                className="mt-1.5 px-[10px] py-2 border border-border rounded-md bg-surface text-heading"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}
          <button type="submit" className="mt-3 px-[14px] py-[10px] bg-primary text-white rounded-lg border-none cursor-pointer">
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>
      </section>
    );
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-[100] bg-surface border-b border-border shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-between px-5 py-[10px]">
        <div className="font-bold text-base text-heading">W.H.A.T.T</div>
        <div>
          {isAuthenticated ? (
            <>
              <button type="button" className="ml-2 px-[14px] py-[10px] bg-primary text-white rounded-md border-none outline-none cursor-pointer font-medium hover:bg-gray-300" onClick={() => navigate("/myflashcards")}>My Flashcards</button>
              <button type="button" className="ml-2 px-[14px] py-[10px] bg-primary text-white rounded-md border-none outline-none cursor-pointer font-medium hover:bg-gray-300" onClick={() => navigate("/search")}>Search</button>
              <button type="button" className="ml-2 px-[14px] py-[10px] bg-primary text-white rounded-md border-none outline-none cursor-pointer font-medium hover:bg-gray-300" onClick={() => navigate("/create")}>Create</button>
              <button type="button" className="ml-2 px-[14px] py-[10px] bg-primary text-white rounded-md border-none outline-none cursor-pointer font-medium hover:bg-gray-300" onClick={() => navigate("/profile")}>Profile</button>
              <button
                type="button"
                className="ml-2 px-[14px] py-[10px] bg-primary text-white rounded-md border-none outline-none cursor-pointer font-medium hover:bg-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className="ml-2 px-[14px] py-2 rounded-md border border-border bg-primary text-white cursor-pointer" onClick={() => setView("login")}>Login</button>
              <button type="button" className="ml-2 px-[14px] py-2 rounded-md border border-border bg-primary text-white cursor-pointer" onClick={() => setView("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="flex flex-col gap-[25px] content-center items-center grow max-lg:px-5 max-lg:py-8 max-lg:gap-[18px]">
                <div>
                  <h1>W.H.A.T.T</h1>
                  <p>We have a test tomorrow!</p>
                </div>
              </section>

              {view === "default" ? (
                <section className="flex border-t border-border text-left max-lg:flex-col max-lg:text-center">
                  <div className="flex-1 p-8 border-r border-border max-lg:border-r-0 max-lg:border-b max-lg:border-border max-lg:p-[24px_20px]">
                    <h2>1. Upload your slideshow</h2>
                    <p>Watch AI transform it into interactive flashcards!</p>
                    <br />
                    <h2>2. Organize your sets by class or category</h2>
                    <p>Watch AI transform it into interactive flashcards!</p>
                    <br />
                    <h2>3. Study your own sets or search for others</h2>
                    <p>Watch AI transform it into interactive flashcards!</p>
                  </div>

                  <div className="flex-1 p-8 max-lg:p-[24px_20px]">
                    <svg className="mb-4 w-[22px] h-[22px]" role="presentation" aria-hidden="true">
                      <use href="/icons.svg#social-icon"></use>
                    </svg>
                    <h2>Connect with us</h2>
                    <p>Join the Vite community</p>
                    <ul className="list-none p-0 flex gap-2 mt-8 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
                      <li>
                        <a
                          className="text-heading text-base rounded-md bg-[rgba(244,243,236,0.5)] dark:bg-[rgba(47,48,58,0.5)] flex px-3 py-1.5 items-center gap-2 no-underline transition-shadow duration-300 hover:shadow-lg"
                          href="https://github.com/vitejs/vite"
                          target="_blank"
                        >
                          <svg className="h-[18px] w-[18px]" role="presentation" aria-hidden="true">
                            <use href="/icons.svg#github-icon"></use>
                          </svg>
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-heading text-base rounded-md bg-[rgba(244,243,236,0.5)] dark:bg-[rgba(47,48,58,0.5)] flex px-3 py-1.5 items-center gap-2 no-underline transition-shadow duration-300 hover:shadow-lg"
                          href="https://chat.vite.dev/"
                          target="_blank"
                        >
                          <svg className="h-[18px] w-[18px]" role="presentation" aria-hidden="true">
                            <use href="/icons.svg#discord-icon"></use>
                          </svg>
                          Discord
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              ) : (
                renderAuthForm()
              )}

              <div className="relative w-full before:content-[''] before:absolute before:top-[-4.5px] before:border-[5px] before:border-transparent before:left-0 before:border-l-border after:content-[''] after:absolute after:top-[-4.5px] after:border-[5px] after:border-transparent after:right-0 after:border-r-border"></div>
              <section className="h-[88px] border-t border-border max-lg:h-12"></section>
            </>
          }
        />
        <Route path="/myflashcards" element={<MyFlashcards />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/study" element={<StudyView />} />
        <Route path="*" element={<MyFlashcards />} />
      </Routes>
    </>
  );
}

export default App;
