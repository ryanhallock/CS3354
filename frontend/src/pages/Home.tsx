import { ArrowRight, BookOpen, GraduationCap, LayoutGrid, Sparkles } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to="/myflashcards" replace />;

  return (
    <div className="mx-auto flex w-[90%] max-w-5xl flex-col gap-10 py-8 text-left md:gap-14 md:py-10">
      {/* Hero: The Big "Why" */}
      <section className="relative flex flex-col items-center text-center">
        <div className="bg-primary/10 text-primary mb-3 inline-block rounded-full px-4 py-1 text-[10px] font-bold tracking-widest uppercase md:text-xs">
          Flashcards for the Final Stretch
        </div>
        <h1 className="text-heading mb-3 text-[clamp(2.5rem,8vw,5rem)] leading-none font-black tracking-tighter select-none md:mb-5">
          W.H.A.T.T
        </h1>
        <p className="text-heading text-xl font-medium tracking-tight md:text-2xl">
          We have a test tomorrow!
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/signup">
            <Button className="bg-primary text-surface h-12 border-2 border-black px-6 text-lg font-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              className="text-heading h-12 border-2 border-black px-6 text-lg font-black transition-all hover:bg-black/5"
            >
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature 1: The Creator (Asymmetric) */}
      <section className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <div className="flex-1">
          <span className="text-primary mb-1.5 block text-lg font-black italic">01. Creation</span>
          <h2 className="text-heading mb-3 text-3xl leading-tight font-black tracking-tighter md:text-4xl">
            Create sets in seconds.
          </h2>
          <p className="text-text max-w-md text-lg leading-relaxed md:text-xl">
            No more tedious manual entry. Build custom flashcard sets tailored to your exam topics
            quickly and efficiently.
          </p>
        </div>
        <div className="bg-surface border-heading relative flex aspect-square w-full max-w-[240px] rotate-2 items-center justify-center rounded-[1.5rem] border-4 shadow-[10px_10px_0_0_rgba(28,32,138,0.1)] transition-transform hover:rotate-0">
          <BookOpen className="text-primary h-14 w-14" />
          <div className="bg-primary absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Feature 2: Organization (Dark Mode Inversion) */}
      <section className="relative flex flex-col items-center gap-6 md:flex-row-reverse md:gap-12">
        <div className="flex-1 md:text-right">
          <span className="text-primary mb-1.5 block text-lg font-black italic">
            02. Organization
          </span>
          <h2 className="text-heading mb-3 text-3xl leading-tight font-black tracking-tighter md:text-4xl">
            Keep the chaos at bay.
          </h2>
          <p className="text-text max-w-md text-lg leading-relaxed md:ml-auto md:text-xl">
            Group your sets by class or category. Your study dashboard stays clean, even when your
            schedule isn't.
          </p>
        </div>
        <div className="bg-heading relative flex aspect-video w-full max-w-[320px] -rotate-2 items-center justify-center overflow-hidden rounded-[1.5rem] border-4 border-black shadow-lg transition-transform hover:rotate-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_2px,_transparent_2px)] bg-[length:16px_16px] opacity-20" />
          <LayoutGrid className="text-surface relative z-10 h-14 w-14" />
        </div>
      </section>

      {/* Feature 3: Mastery (Brutalist Bento) */}
      <section className="bg-primary/5 relative overflow-hidden rounded-[1.5rem] border-2 border-black p-6 text-center shadow-[6px_6px_0_0_#000] md:p-10">
        <Sparkles className="text-primary/10 absolute top-3 right-3 h-10 w-10" />
        <span className="text-primary mb-1.5 block text-lg font-black italic">03. Mastery</span>
        <h2 className="text-heading mb-4 text-3xl font-black tracking-tighter md:text-4xl">
          Study, Master, Share.
        </h2>
        <p className="text-text mx-auto mb-6 max-w-2xl text-lg leading-relaxed md:text-xl">
          Practice with your own materials or discover sets from other students. Collaboration is
          the best shortcut to an A.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-surface border-heading flex flex-col items-center gap-2 rounded-[1rem] border-2 p-4 shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-1">
            <GraduationCap className="text-primary h-8 w-8" />
            <span className="text-base font-black">Self Study</span>
          </div>
          <div className="bg-surface border-heading flex flex-col items-center gap-2 rounded-[1rem] border-2 p-4 shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-1">
            <Sparkles className="text-primary h-8 w-8" />
            <span className="text-base font-black">Community</span>
          </div>
        </div>
      </section>

      {/* Final CTA: Extreme Bold */}
      <section className="bg-heading text-surface rounded-[2.5rem] border-4 border-black p-8 text-center shadow-[12px_12px_0_0_var(--color-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:p-12">
        <h2 className="mb-4 text-3xl font-black tracking-tighter md:text-5xl">Ready to ace it?</h2>
        <p className="mx-auto mb-6 max-w-xl text-lg font-medium opacity-90 md:text-xl">
          Join other students who study smarter, not harder.
        </p>
        <div className="flex justify-center">
          <Link to="/signup">
            <Button className="bg-surface text-primary group flex h-14 items-center gap-2 rounded-[1.25rem] px-8 text-lg font-black transition-all hover:scale-105 active:scale-95">
              Sign Up Now
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
