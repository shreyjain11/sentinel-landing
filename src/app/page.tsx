"use client";
import React, { useState, useRef, useEffect } from "react";
import "./globals.css";
import { useForm } from "react-hook-form";

function Typewriter() {
  const typewriterPhrases = [
    "Empowering physics students everywhere.",
    "AP & Olympiad Physics resources.",
    "Mentorship and community.",
    "Interactive simulations.",
    "Bootcamps and research ideas.",
    "Internship and summer program connector.",
    "Feynman Lectures simplified.",
    "Join the movement.",
    "Helping students fulfill their potential.",
    "Making physics accessible to everyone.",
    "Connecting students with opportunities.",
    "Simplifying complex concepts.",
    "Building a community of learners."
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!deleting && displayed.length < typewriterPhrases[index].length) {
      timeout = setTimeout(() => setDisplayed(typewriterPhrases[index].slice(0, displayed.length + 1)), 50);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((index + 1) % typewriterPhrases.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, typewriterPhrases]);

  return (
    <span className="font-medium text-xl md:text-2xl text-center min-h-[2.5em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 select-none leading-[1.2]">
      {displayed}|
    </span>
  );
}

function ParallaxBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCoords({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 12+ blobs, organic positions, different sizes/colors/movement
  const blobs = [
    { style: { background: "radial-gradient(circle at 50% 50%, #6366f1 0%, #a855f7 80%, transparent 100%)", width: 340, height: 340, filter: "blur(60px)", opacity: 0.32, left: `calc(2% + ${(coords.x - 0.5) * 120}px)`, top: `calc(8% + ${(coords.y - 0.5) * 80}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f472b6 0%, #a855f7 80%, transparent 100%)", width: 120, height: 120, filter: "blur(30px)", opacity: 0.18, left: `calc(80% + ${(coords.x - 0.5) * 60}px)`, top: `calc(5% + ${(coords.y - 0.5) * 40}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #34d399 0%, #6366f1 80%, transparent 100%)", width: 180, height: 180, filter: "blur(40px)", opacity: 0.15, left: `calc(10% + ${(coords.x - 0.5) * 200}px)`, top: `calc(80% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #a855f7 0%, #6366f1 80%, transparent 100%)", width: 320, height: 320, filter: "blur(80px)", opacity: 0.22, left: `calc(70% + ${(coords.x - 0.5) * 100}px)`, top: `calc(60% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #fbbf24 0%, #a855f7 80%, transparent 100%)", width: 100, height: 100, filter: "blur(30px)", opacity: 0.13, left: `calc(90% + ${(coords.x - 0.5) * 80}px)`, top: `calc(90% + ${(coords.y - 0.5) * 80}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #a855f7 80%, transparent 100%)", width: 200, height: 200, filter: "blur(50px)", opacity: 0.18, left: `calc(45% + ${(coords.x - 0.5) * 60}px)`, top: `calc(40% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #a855f7 0%, #f472b6 80%, transparent 100%)", width: 90, height: 90, filter: "blur(20px)", opacity: 0.12, left: `calc(5% + ${(coords.x - 0.5) * 100}px)`, top: `calc(95% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f59e42 0%, #a855f7 80%, transparent 100%)", width: 160, height: 160, filter: "blur(40px)", opacity: 0.14, left: `calc(15% + ${(coords.x - 0.5) * 120}px)`, top: `calc(60% + ${(coords.y - 0.5) * 100}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #6366f1 80%, transparent 100%)", width: 260, height: 260, filter: "blur(70px)", opacity: 0.19, left: `calc(80% + ${(coords.x - 0.5) * 120}px)`, top: `calc(80% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #34d399 0%, #60a5fa 80%, transparent 100%)", width: 80, height: 80, filter: "blur(20px)", opacity: 0.10, left: `calc(2% + ${(coords.x - 0.5) * 60}px)`, top: `calc(2% + ${(coords.y - 0.5) * 40}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f472b6 0%, #a21caf 80%, transparent 100%)", width: 150, height: 150, filter: "blur(30px)", opacity: 0.15, left: `calc(70% + ${(coords.x - 0.5) * 80}px)`, top: `calc(45% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #6366f1 80%, transparent 100%)", width: 100, height: 100, filter: "blur(25px)", opacity: 0.11, left: `calc(25% + ${(coords.x - 0.5) * 40}px)`, top: `calc(55% + ${(coords.y - 0.5) * 40}px)` } },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none">
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...blob.style,
            borderRadius: "50%",
            transition: "left 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)",
            zIndex: -20,
          }}
        />
      ))}
    </div>
  );
}

function GlassNoiseOverlay() {
  // Implementation of GlassNoiseOverlay component
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* GlassNoiseOverlay content */}
    </div>
  );
}

function CursorRipple() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 120);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {visible && pos && (
        <div
          style={{
            position: "absolute",
            left: pos.x - 36,
            top: pos.y - 36,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(168,85,247,0.10) 100%)",
            filter: "blur(10px)",
            opacity: 0.6,
            pointerEvents: "none",
            zIndex: 100,
            transition: "opacity 0.15s"
          }}
        />
      )}
    </div>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    console.log("Submitting email:", data.email);
    setError(null);
    setSubmitted(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const resData = await res.json();
      console.log("API response:", resData);
      if (res.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        setError(resData.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-white font-sans transition-colors duration-500">
      <CursorRipple />
      <ParallaxBlobs />
      <GlassNoiseOverlay />
      <div className="flex flex-col items-center gap-8 px-4 py-16 w-full">
        <h1
          className="text-5xl md:text-7xl font-extrabold text-center tracking-tight drop-shadow-lg mb-2 relative select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-[1.2]"
        >
          Project Physica
        </h1>
        <div className="mb-2">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
            <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#6366f1" strokeWidth="3" />
            <ellipse cx="30" cy="30" rx="10" ry="25" stroke="#a855f7" strokeWidth="3" transform="rotate(30 30 30)" />
            <ellipse cx="30" cy="30" rx="10" ry="25" stroke="#f59e42" strokeWidth="3" transform="rotate(-30 30 30)" />
            <circle cx="30" cy="30" r="4" fill="#fff" />
          </svg>
        </div>
        <Typewriter />
        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 items-center w-full justify-center">
            <input
              type="email"
              required
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 md:w-72 shadow-md"
            />
            <button
              type="submit"
              className="px-7 py-2 rounded-lg font-bold shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {submitted ? "Added!" : "Join the Waitlist"}
            </button>
          </form>
          {errors.email && (
            <div className="text-red-400 text-sm mt-2">Please enter a valid email.</div>
          )}
          {error && (
            <div className="text-red-400 text-sm mt-2">{error}</div>
          )}
          <div className="flex gap-4 mt-2">
            <a
              href="https://discord.gg/QMyXmMUY"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg font-semibold shadow-lg transform transition-transform duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Discord
            </a>
            <a
              href="https://www.instagram.com/projectphysica"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg font-semibold shadow-lg transform transition-transform duration-200 hover:scale-105 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// Add this to your globals.css for .animate-spin-slow:
// .animate-spin-slow { animation: spin 6s linear infinite; }
// @keyframes spin { to { transform: rotate(360deg); } }
