import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // or a subtle spinner
  }

  if (user) {
    return <Navigate to="/myflashcards" replace />;
  }

  return (
    <>
      <section className="flex grow flex-col content-center items-center gap-6.25 max-lg:gap-4.5 max-lg:px-5 max-lg:py-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold">W.H.A.T.T</h1>
          <p className="text-text text-xl">We have a test tomorrow!</p>
        </div>
      </section>

      <section className="border-border flex border-t text-left max-lg:flex-col max-lg:text-center">
        <div className="border-border max-lg:border-border flex-1 border-r p-8 max-lg:border-r-0 max-lg:border-b max-lg:p-[24px_20px]">
          <h2 className="mb-2 text-2xl font-semibold">1. Upload your slideshow</h2>
          <p className="text-text">Upload a PowerPoint or PDF and we'll generate flashcards automatically!</p>
          <br />
          <h2 className="mb-2 text-2xl font-semibold">
            2. Organize your sets by class or category
          </h2>
          <p className="text-text">Keep your study materials tidy by grouping flashcard sets into classes or custom categories!</p>
          <br />
          <h2 className="mb-2 text-2xl font-semibold">
            3. Study your own sets or search for others
          </h2>
          <p className="text-text">Practice with your own sets or discover what other students have already made!</p>
        </div>

        <div className="flex-1 p-8 max-lg:p-[24px_20px]">
          <svg className="mb-4 h-5.5 w-5.5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>

          <h2 className="mb-2 text-2xl font-semibold">Connect with us</h2>
          <p className="text-text">Join the Vite community</p>

          <ul className="mt-8 flex list-none gap-2 p-0 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
            <li>
              <a
                className="text-heading flex items-center gap-2 rounded-md bg-[rgba(244,243,236,0.5)] px-3 py-1.5 text-base no-underline transition-shadow duration-300 hover:shadow-lg dark:bg-[rgba(47,48,58,0.5)]"
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4.5 w-4.5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                className="text-heading flex items-center gap-2 rounded-md bg-[rgba(244,243,236,0.5)] px-3 py-1.5 text-base no-underline transition-shadow duration-300 hover:shadow-lg dark:bg-[rgba(47,48,58,0.5)]"
                href="https://chat.vite.dev/"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4.5 w-4.5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="before:border-l-border after:border-r-border relative w-full before:absolute before:top-[-4.5px] before:left-0 before:border-[5px] before:border-transparent before:content-[''] after:absolute after:top-[-4.5px] after:right-0 after:border-[5px] after:border-transparent after:content-['']"></div>
      <section className="border-border h-22 border-t max-lg:h-12"></section>
    </>
  );
}
