import { useState } from 'react'
import './App.css'

function App() {
  const [view, setView] = useState<'default' | 'login' | 'signup'>('default')

  const renderAuthForm = () => {
    const isSignup = view === 'signup'

    return (
      <section id="auth-section">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
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
          <button type="button" className="primary-btn">
            {isSignup ? 'Create Account' : 'Log In'}
          </button>
        </form>
      </section>
    )
  }

  return (
    <>
      <header className="top-nav">
        <div className="logo">W.H.A.T.T</div>
        <div>
          <button type="button" onClick={() => setView('login')}>
            Login
          </button>
          <button type="button" onClick={() => setView('signup')}>
            Sign Up
          </button>
        </div>
      </header>
      <section id="center">
        <div>
          <h1>W.H.A.T.T</h1>
          <p>
            We have a test tomorrow!
          </p>
        </div>
      </section>

      

      {view === 'default' ? (
        <section id="next-steps">
          <div id="docs">
            <h2>1. Upload your slideshow</h2>
            <p>Watch AI transform it into interactive flashcards!</p>
            <br></br>
            <h2>2. Organize your sets by class or category</h2>
            <p>Watch AI transform it into interactive flashcards!</p>
            <br></br>
            <h2>3. Study your own sets or search for others</h2>
            <p>Watch AI transform it into interactive flashcards!</p>
          </div>
          <div id="social">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2>Connect with us</h2>
            <p>Join the Vite community</p>
            <ul>
              <li>
                <a href="https://github.com/vitejs/vite" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#github-icon"></use>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chat.vite.dev/" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
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

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
