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
      <section className="flex flex-col gap-6.25 content-center items-center grow max-lg:px-5 max-lg:py-8 max-lg:gap-4.5">
        <div>
          <h1 className="text-4xl font-bold mb-2">W.H.A.T.T</h1>
          <p className="text-xl text-text">We have a test tomorrow!</p>
        </div>
      </section>

      <section className="flex border-t border-border text-left max-lg:flex-col max-lg:text-center">
        <div className="flex-1 p-8 border-r border-border max-lg:border-r-0 max-lg:border-b max-lg:border-border max-lg:p-[24px_20px]">
          <h2 className="text-2xl font-semibold mb-2">1. Upload your slideshow</h2>
          <p className="text-text">Watch AI transform it into interactive flashcards!</p>
          <br />
          <h2 className="text-2xl font-semibold mb-2">2. Organize your sets by class or category</h2>
          <p className="text-text">Watch AI transform it into interactive flashcards!</p>
          <br />
          <h2 className="text-2xl font-semibold mb-2">3. Study your own sets or search for others</h2>
          <p className="text-text">Watch AI transform it into interactive flashcards!</p>
        </div>

        <div className="flex-1 p-8 max-lg:p-[24px_20px]">
          <svg className="mb-4 w-5.5 h-5.5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>

          <h2 className="text-2xl font-semibold mb-2">Connect with us</h2>
          <p className="text-text">Join the Vite community</p>

          <ul className="list-none p-0 flex gap-2 mt-8 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
            <li>
              <a
                className="text-heading text-base rounded-md bg-[rgba(244,243,236,0.5)] dark:bg-[rgba(47,48,58,0.5)] flex px-3 py-1.5 items-center gap-2 no-underline transition-shadow duration-300 hover:shadow-lg"
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
                className="text-heading text-base rounded-md bg-[rgba(244,243,236,0.5)] dark:bg-[rgba(47,48,58,0.5)] flex px-3 py-1.5 items-center gap-2 no-underline transition-shadow duration-300 hover:shadow-lg"
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

      <div className="relative w-full before:content-[''] before:absolute before:top-[-4.5px] before:border-[5px] before:border-transparent before:left-0 before:border-l-border after:content-[''] after:absolute after:top-[-4.5px] after:border-[5px] after:border-transparent after:right-0 after:border-r-border"></div>
      <section className="h-22 border-t border-border max-lg:h-12"></section>
    </>
  );
}
