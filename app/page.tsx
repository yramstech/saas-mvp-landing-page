"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvyenaz";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, source: "hireroom-waitlist" }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError("Something went wrong. Try again?");
      }
    } catch {
      setError("Network error. Try again?");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold tracking-tight text-slate-900">
            HireRoom
          </a>
          <span className="hidden text-sm text-slate-500 sm:inline">
            Pre-launch · Built by yramstech
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 text-center sm:pt-24">
        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Paste the job.
          <br />
          Get the CV.
          <br />
          <span className="text-indigo-600">Land the interview.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          HireRoom auto-tailors your resume for every job posting in 30 seconds.
          Bullets re-ordered. Keywords matched. Irrelevant lines hidden. No more
          rewriting.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            disabled={submitted}
            aria-label="Email address"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={loading || submitted}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "..." : submitted ? "✓ Joined" : "Join the waitlist"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-emerald-700">
            Thanks. You're on the list — first 100 get HireRoom free at launch.
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <p className="mt-3 text-sm text-slate-500">
          First 100 get HireRoom free at launch. No card needed.
        </p>
      </section>

      <section className="mx-auto max-w-3xl border-t border-slate-200 px-6 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          The 30-minute-per-job tax that's killing your pipeline.
        </h2>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
          <p>
            You know mass-applying with one CV doesn't work. Recruiters can spot a generic resume in 6 seconds and they auto-reject the rest.
          </p>
          <p>
            So you tailor each one. Re-order bullets to match the job posting. Surface the keywords that show you read it. Hide the lines that look irrelevant for this role.
          </p>
          <p>
            Each tailored CV takes 30 minutes. Across 20 applications, that's 10 hours — gone. Most people quit after the third one and slide back to mass-apply.
          </p>
          <p className="font-semibold text-slate-900">
            HireRoom does the 30 minutes in 30 seconds. Same quality. 60x faster. You apply for jobs at the speed your career deserves.
          </p>
        </div>
      </section>


      <section className="mx-auto max-w-5xl border-t border-slate-200 px-6 py-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Step n="1" title="Paste the job">
            Drop in the job posting URL or paste the description text.
          </Step>
          <Step n="2" title="Upload your CV">
            Your master CV (.docx). One time. Reused for every job.
          </Step>
          <Step n="3" title="Get the tailored .docx">
            Bullets re-ordered. Keywords matched. Ready to send. 30 seconds.
          </Step>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-4 text-center">
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
          <span className="font-semibold">
            Same CV across 200 jobs → mostly silence.
          </span>
          <br />
          <span className="font-semibold">
            Tailored CV per job → suddenly callbacks.
          </span>
          <br />
          The math is obvious. The bottleneck is time. That's what HireRoom
          solves.
        </p>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <span>© 2026 HireRoom · Built on Claude AI</span>
          <div className="flex gap-6">
            <a
              href="https://yramstech.com"
              className="hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
            <a
              href="https://dev.to/yramstech"
              className="hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
            >
              Blog
            </a>
            <a
              href="https://linkedin.com/in/blessatama"
              className="hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

interface StepProps {
  n: string;
  title: string;
  children: React.ReactNode;
}

function Step({ n, title, children }: StepProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-left">
      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
        Step {n}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}
