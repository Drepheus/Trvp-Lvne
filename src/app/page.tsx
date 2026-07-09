"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Music, Gamepad2, Video, Headphones, ArrowRight, 
  Play, Pause, Calendar, Send, Sparkles, ExternalLink, ChevronRight, User, Camera, 
  Tv, Mic, Mic2, Loader2
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface Track {
  id: number;
  title: string;
  album: string;
  duration: string;
  coverUrl: string;
  spotifyUrl: string;
  soundcloudUrl: string;
  appleUrl: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Universal",
    album: "Universal Single",
    duration: "2:54",
    coverUrl: "/images/universal.png",
    spotifyUrl: "https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj",
    soundcloudUrl: "https://soundcloud.com/user-484939163",
    appleUrl: "https://music.apple.com/us/artist/trvp-lvne/1473470814",
  },
  {
    id: 2,
    title: "Changed",
    album: "Changed Single",
    duration: "3:12",
    coverUrl: "/images/changed.png",
    spotifyUrl: "https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj",
    soundcloudUrl: "https://soundcloud.com/user-484939163",
    appleUrl: "https://music.apple.com/us/artist/trvp-lvne/1473470814",
  },
  {
    id: 3,
    title: "The Bvit Typez",
    album: "The Bvit Typez EP",
    duration: "2:45",
    coverUrl: "/images/bvit.png",
    spotifyUrl: "https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj",
    soundcloudUrl: "https://soundcloud.com/user-484939163",
    appleUrl: "https://music.apple.com/us/artist/trvp-lvne/1473470814",
  },
  {
    id: 4,
    title: "We Never Are",
    album: "We Never Are Single",
    duration: "3:05",
    coverUrl: "/images/we_never_are.png",
    spotifyUrl: "https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj",
    soundcloudUrl: "https://soundcloud.com/user-484939163",
    appleUrl: "https://music.apple.com/us/artist/trvp-lvne/1473470814",
  },
  {
    id: 5,
    title: "Facing My Demons",
    album: "Facing My Demons Single",
    duration: "3:30",
    coverUrl: "/images/demons.png",
    spotifyUrl: "https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj",
    soundcloudUrl: "https://soundcloud.com/user-484939163",
    appleUrl: "https://music.apple.com/us/artist/trvp-lvne/1473470814",
  },
];

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 45, seconds: 12 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  
  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Music progress bar animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
      scrollY.set(scrollTop);
      scrollYProgress.set(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, scrollYProgress]);

  // Mouse position tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-based transforms for parallax elements
  const tiktokBgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const tiktokBgX = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const tiktokBg2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const tiktokBg2X = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const gamingBgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-background text-foreground">
      {/* Decorative Glow Elements with Mouse Parallax */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"
        style={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[100] bg-gradient-to-r from-primary to-accent"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading font-black tracking-widest text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600"
        >
          TRVP LVNE
        </motion.div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase text-zinc-400">
          <motion.a 
            href="#tiktok-live" 
            className="hover:text-white transition-colors relative"
            whileHover={{ y: -2 }}
          >
            TikTok Live
            <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
          <motion.a 
            href="#gaming" 
            className="hover:text-white transition-colors relative"
            whileHover={{ y: -2 }}
          >
            Gaming
            <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
          <motion.a 
            href="#music" 
            className="hover:text-white transition-colors relative"
            whileHover={{ y: -2 }}
          >
            Music
            <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
          <motion.a 
            href="#podcast" 
            className="hover:text-white transition-colors relative"
            whileHover={{ y: -2 }}
          >
            Podcast
            <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
          <motion.a 
            href="#social" 
            className="hover:text-white transition-colors relative"
            whileHover={{ y: -2 }}
          >
            Social
            <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
        </nav>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--primary)" }}
          whileTap={{ scale: 0.95 }}
          href="#music"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_var(--primary)] transition-all"
        >
          Listen Now
        </motion.a>
      </header>

      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-6">
        <motion.div 
          className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold w-max"
            >
              <motion.span 
                animate={{ rotate: [0, 0, 360] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" /> 
              </motion.span>
              <span>The Central Hub</span>
            </motion.div>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              }}
              className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
            >
              ENTER THE <br />
              <span className="text-primary hover:text-accent transition-colors duration-500">TRVP LVNE</span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              }}
              className="text-lg md:text-xl text-zinc-400 font-light max-w-xl leading-relaxed"
            >
              The official hub for all things Trvp Lvne. Catch the latest TikTok streams, explore the gaming channel, dive into the discography, and tune into the podcast.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <motion.a 
                href="#tiktok-live" 
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                TikTok Live <Video className="w-4 h-4 fill-black" />
              </motion.a>
              <motion.a 
                href="#gaming" 
                className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800 hover:scale-105 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Gaming Channel <Gamepad2 className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:col-span-5 flex justify-center relative"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            }}
          >
            <motion.div
              className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_60px_rgba(147,51,234,0.15)] group"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img 
                src="/images/profile1.jpg" 
                alt="Trvp Lvne profile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                whileHover={{ scale: 1.08 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              {/* Ring animation */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
                animate={{ 
                  scale: [1, 1.15], 
                  opacity: [0.6, 0] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-accent/30 rounded-full"
                animate={{ 
                  scale: [1, 1.25], 
                  opacity: [0.4, 0] 
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 text-zinc-600"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* 2. TikTok Live Section (White Theme) */}
      <section id="tiktok-live" className="w-full bg-white text-zinc-900 py-32 relative overflow-hidden transition-colors duration-700">
        {/* Background Accents with Parallax */}
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
          style={{ y: tiktokBgY, x: tiktokBgX }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"
          style={{ y: tiktokBg2Y, x: tiktokBg2X }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-black font-bold uppercase tracking-widest text-xs mb-6"
            >
              <Video className="w-4 h-4 text-red-600" /> @thenvmeislvne
            </motion.div>
            <motion.h2 
              className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6"
            >
              <motion.span>TIKTOK</motion.span>
              <motion.span className="text-primary ml-2">LIVE EVENTS</motion.span>
            </motion.h2>
            <motion.p className="text-zinc-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Join the official TikTok channel for interactive livestream DJ sets, track giveaways, and community Q&A.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Countdown / Banner */}
            <motion.div 
              className="lg:col-span-7 bg-zinc-50 rounded-3xl p-8 border border-zinc-200 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="inline-flex items-center gap-1.5 text-xs text-red-600 font-bold uppercase tracking-wider mb-4"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" /> Next Livestream
              </motion.div>
              <motion.h3 
                className="font-heading text-4xl font-black text-black mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Weekly Session
              </motion.h3>
              
              <motion.div 
                className="flex gap-4 sm:gap-8 mb-10"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((t, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-black rounded-2xl flex items-center justify-center font-heading font-black text-3xl sm:text-4xl shadow-lg border border-zinc-100"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      {String(t.val).padStart(2, "0")}
                    </motion.div>
                    <span className="text-xs text-zinc-500 font-bold uppercase mt-3 tracking-widest">{t.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a 
                href="https://www.tiktok.com/@thenvmeislvne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-zinc-800 hover:scale-105 transition-all text-lg shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Go To Channel <ChevronRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Banner Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5 h-[400px] rounded-3xl overflow-hidden shadow-2xl relative group"
            >
              <motion.img 
                src="/images/universal.png" 
                alt="TikTok Banner" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <motion.div 
                className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Video className="w-16 h-16 mb-4 text-white drop-shadow-lg" />
                </motion.div>
                <h4 className="font-heading text-3xl font-black mb-2">@thenvmeislvne</h4>
                <p className="font-semibold text-white/80">Follow for Live Notifications</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TikTok Gaming Channel Section (Opposite Color / Dark) */}
      <section id="gaming" className="w-full bg-black text-white py-32 relative overflow-hidden border-t-8 border-primary">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/bvit.png')] bg-cover bg-center opacity-10 blur-sm mix-blend-screen"
          style={{ y: gamingBgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-widest text-xs mb-6 border border-primary/50"
            >
              <Gamepad2 className="w-4 h-4" /> @trvppicusonallgames
            </motion.div>
            <motion.h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent">
              GAMING CHANNEL
            </motion.h2>
            <motion.p className="text-zinc-300 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Watch gameplay highlights, edits, and live playthroughs covering the latest releases and competitive matches.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.a
              href="https://www.tiktok.com/@trvppicusonallgames"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-panel p-1 rounded-3xl bg-gradient-to-br from-primary/40 to-black overflow-hidden group border border-primary/20"
              whileHover={{ y: -12, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="bg-black/80 rounded-[22px] p-8 h-full flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div>
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Gamepad2 className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <motion.h3 className="font-heading text-3xl font-black mb-4">Latest Gaming Clips</motion.h3>
                  <motion.p className="text-zinc-400 leading-relaxed mb-8">
                    Dive into the action. I post daily gaming highlights, funny moments, and intense plays straight from the stream.
                  </motion.p>
                </div>
                <motion.div 
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm tracking-wider"
                  whileHover={{ x: 8 }}
                >
                  Watch on TikTok <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@trvppicusonallgames"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-panel p-1 rounded-3xl bg-gradient-to-br from-accent/40 to-black overflow-hidden group border border-accent/20"
              whileHover={{ y: -12, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="bg-black/80 rounded-[22px] p-8 h-full flex flex-col justify-between relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.img 
                  src="/images/profile2.jpg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-luminosity" 
                  alt="Gaming Background" 
                  whileHover={{ scale: 1.05 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500"
                    whileHover={{ scale: 1.1, rotate: -180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Tv className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <motion.h3 className="font-heading text-3xl font-black mb-4 text-white">Live Playthroughs</motion.h3>
                  <motion.p className="text-zinc-300 leading-relaxed mb-8 font-medium drop-shadow-md">
                    Catch me live gaming. Competitive matches, story mode grinds, and hanging out with the community.
                  </motion.p>
                </div>
                <motion.div 
                  className="inline-flex items-center gap-2 text-accent font-bold uppercase text-sm tracking-wider relative z-10 bg-black/50 w-max px-4 py-2 rounded-full backdrop-blur-md"
                  whileHover={{ x: 8 }}
                >
                  Join The Stream <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 4. Music Section */}
      <SectionWrapper id="music" className="relative z-10 py-32 bg-zinc-950">
        <motion.div 
          className="text-center mb-16"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest text-xs mb-6"
          >
            <Music className="w-4 h-4" /> Discography
          </motion.div>
          <motion.h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            OFFICIAL MUSIC
          </motion.h2>
          <motion.p className="text-zinc-400 text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Explore the latest drops, stream the albums, and find Trvp Lvne on your favorite music platform.
          </motion.p>
          
          {/* Main Music Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
          >
            <motion.a 
              href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-full bg-[#1DB954] text-black font-bold hover:scale-105 transition-transform flex items-center gap-2"
              whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" className="h-5 object-contain opacity-80" /> Listen on Spotify
            </motion.a>
            <motion.a 
              href="https://music.apple.com/us/artist/trvp-lvne/1473470814" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-full bg-[#FA243C] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
              whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(250, 36, 60, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Music className="w-5 h-5" /> Apple Music
            </motion.a>
            <motion.a 
              href="https://soundcloud.com/user-484939163" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-full bg-[#FF5500] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
              whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(255, 85, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Headphones className="w-5 h-5" /> SoundCloud
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Releases Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20 max-w-7xl mx-auto px-6"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }}}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRACKS.map((track, idx) => (
            <motion.div
              key={track.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="glass-panel p-4 rounded-3xl group relative overflow-hidden border border-white/5 hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-6 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-heading font-black text-xl text-white mb-1">{track.title}</h4>
                <p className="text-xs text-primary font-semibold mb-4">{track.album}</p>
              </motion.div>
              <motion.div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <motion.img 
                  src={track.coverUrl} 
                  alt={track.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>
              <motion.div className="px-1 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="font-heading font-bold text-white text-lg">{track.title}</h3>
                <p className="text-sm text-zinc-500">{track.album}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Spotify Official Embed */}
        <motion.div 
          className="max-w-4xl mx-auto px-6 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 glow-purple">
            <iframe 
              src="https://open.spotify.com/embed/album/5Pueca7xcihzG7c2o1pXTj?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              allowFullScreen={false} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="border-0 bg-transparent"
            ></iframe>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* 5. Podcast Section */}
      <SectionWrapper id="podcast" className="relative z-10 py-32 bg-gradient-to-b from-zinc-950 to-zinc-900 overflow-hidden">
        {/* Floating background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"
          animate={{ 
            x: [0, -25, 0], 
            y: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest text-xs mb-6"
            >
              <Mic2 className="w-4 h-4 text-primary" /> THE TRVP LVNE PODCAST
            </motion.div>
            <motion.h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              OFFICIAL PODCAST
            </motion.h2>
            <motion.p className="text-zinc-400 text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Deep dives into the creative process, underground culture, gaming stories, and unfiltered conversations. New episodes weekly.
            </motion.p>

            {/* Platform Links */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
            >
              <motion.a 
                href="https://open.spotify.com/show/your-podcast-id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-full bg-[#1DB954] text-black font-bold hover:scale-105 transition-transform flex items-center gap-2"
                whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" className="h-5 object-contain opacity-80" /> Spotify
              </motion.a>
              <motion.a 
                href="https://podcasts.apple.com/podcast/your-podcast-id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-full bg-[#9933FF] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
                whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(153, 51, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="w-5 h-5" /> Apple Podcasts
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@your-channel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-full bg-[#FF0000] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
                whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(255, 0, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-5 h-5" /> YouTube
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Featured/Latest Episode */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl overflow-hidden border border-white/5 mb-16"
          >
            <div className="md:flex">
              <div className="relative w-full md:w-1/3 min-h-[280px] md:min-h-[400px] flex-shrink-0 group">
                <motion.img 
                  src="/images/podcast-cover.jpg" 
                  alt="Latest Episode Cover" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/90 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Mic className="w-3 h-3" /> Latest Episode
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-black mb-2">EP. 12 — Building the Underground</h3>
                  <p className="text-zinc-300 text-sm mb-4">Deep dive into the creative process, late-night sessions, and staying independent.</p>
                  <div className="flex flex-wrap gap-3">
                    <motion.a 
                      href="https://open.spotify.com/episode/your-episode-id" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" /> Play Episode
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Calendar className="w-4 h-4" /> 2 Days Ago
                    </motion.a>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Mic2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-3xl font-black text-white">The Trvp Lvne Podcast</h4>
                    <p className="text-zinc-400">Hosted by Trvp Lvne • Weekly Episodes</p>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-zinc-300 leading-relaxed mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to the official podcast where we break down the music, the grind, the gaming culture, and everything in between. From studio sessions to late-night gaming marathons, join the journey of building something real from the ground up. No filters, no fluff — just raw conversations with the creator and special guests from the underground scene.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.a 
                    href="https://open.spotify.com/show/your-podcast-id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-full bg-[#1DB954] text-black font-bold hover:scale-105 transition-transform flex items-center gap-2"
                    whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" className="h-5 object-contain opacity-80" /> Listen on Spotify
                  </motion.a>
                  <motion.a 
                    href="https://podcasts.apple.com/podcast/your-podcast-id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="w-5 h-5" /> Apple Podcasts
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Episodes Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }}}
          >
            <motion.h3 
              className="font-heading text-3xl font-black text-white mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              RECENT EPISODES
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }}}
            >
              {[
                { ep: "EP. 12", title: "Building the Underground", desc: "Creative process, independence, and the grind", duration: "42:15", date: "2 days ago", cover: "/images/ep12.jpg" },
                { ep: "EP. 11", title: "Gaming & Content Creation", desc: "Balancing streams, edits, and music production", duration: "38:42", date: "1 week ago", cover: "/images/ep11.jpg" },
                { ep: "EP. 10", title: "The Sound Design Deep Dive", desc: "Synths, samples, and crafting the signature sound", duration: "45:30", date: "2 weeks ago", cover: "/images/ep10.jpg" },
                { ep: "EP. 09", title: "Late Night Studio Sessions", desc: "Stories from the booth, collabs, and unreleased tracks", duration: "41:22", date: "3 weeks ago", cover: "/images/ep09.jpg" },
                { ep: "EP. 08", title: "Mental Health in the Grind", desc: "Burnout, balance, and staying creative long-term", duration: "39:18", date: "1 month ago", cover: "/images/ep08.jpg" },
                { ep: "EP. 07", title: "From Bedroom to Stage", desc: "The journey from making beats to live shows", duration: "44:05", date: "1 month ago", cover: "/images/ep07.jpg" },
              ].map((ep, idx) => (
                <motion.div
                  key={ep.ep}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="glass-panel p-4 rounded-2xl group relative overflow-hidden border border-white/5 hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <motion.img 
                      src={ep.cover} 
                      alt={ep.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full">{ep.ep}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-white/80 text-xs font-mono">{ep.duration}</div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-primary transition-colors">{ep.title}</h4>
                      <p className="text-sm text-zinc-500 line-clamp-2">{ep.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4">
                      <span className="text-xs text-zinc-500">{ep.date}</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-primary" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* 6. Social & About (Rest of his stuff) */}
      <SectionWrapper id="social" className="relative z-10 py-32 overflow-hidden">
        {/* Floating background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 10, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } }}}
        >
          
          {/* Active Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }}}
          >
            <motion.a
              href="https://www.instagram.com/trvplvne/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-pink-500/50 group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Camera className="w-12 h-12 text-white group-hover:text-pink-500 transition-colors" />
              </motion.div>
              <motion.div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Instagram</h3>
                <p className="text-zinc-400 text-sm">@trvplvne</p>
              </motion.div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@thenvmeislvne"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-white/50 group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } }}}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black to-zinc-800"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Video className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">TikTok</h3>
                <p className="text-zinc-400 text-sm">Main Channel</p>
              </motion.div>
            </motion.a>

            <motion.a
              href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-[#1DB954]/50 group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 } }}}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 to-black"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Music className="w-12 h-12 text-white group-hover:text-[#1DB954] transition-colors" />
              </motion.div>
              <motion.div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Spotify</h3>
                <p className="text-zinc-400 text-sm">Stream Albums</p>
              </motion.div>
            </motion.a>
            
            <motion.a
              href="https://music.apple.com/us/artist/trvp-lvne/1473470814"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-[#FA243C]/50 group relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.3 } }}}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#FA243C]/20 to-black"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ExternalLink className="w-12 h-12 text-white group-hover:text-[#FA243C] transition-colors" />
              </motion.div>
              <motion.div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Apple Music</h3>
                <p className="text-zinc-400 text-sm">Listen Now</p>
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Biography Text */}
          <motion.div 
            className="flex flex-col gap-6 text-left"
            variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }}}
          >
            <motion.h2 className="font-heading text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
              THE ARTIST
            </motion.h2>
            <motion.p className="text-zinc-400 font-light text-xl leading-relaxed" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              TRVP LVNE is an underground artist carving a distinct path through raw storytelling, emotional synth landscapes, and heavy bass lines. Merging dark trap, cloud rap, and digital aesthetics, his music is built for late-night drives, intense gaming sessions, and reflective listeners.
            </motion.p>
            <motion.p className="text-zinc-400 font-light text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Active across both music streaming platforms and interactive live sessions, Trvp Lvne has built an organic community of followers who tune into his regular live events and gaming sessions.
            </motion.p>
            <motion.div 
              className="mt-8 relative w-full h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 glow-pink group"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.img 
                src="/images/profile2.jpg" 
                alt="Trvp Lvne profile setup" 
                className="w-full h-full object-cover object-top"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-heading font-black text-2xl tracking-wider uppercase">TRVP LVNE</p>
                <p className="text-sm text-accent font-semibold tracking-wider">Independent Artist & Creator</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Footer */}
      <motion.footer 
        className="w-full py-16 text-center text-zinc-500 text-sm border-t border-white/5 bg-[#030303]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-heading font-black text-2xl tracking-widest text-white mb-2">TRVP LVNE</h3>
            <p className="text-xs text-zinc-500">Central Hub & Community Portal</p>
          </div>
          <motion.div 
            className="flex gap-6 text-zinc-400"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } }}}
            initial="hidden"
            animate="visible"
          >
            <motion.a 
              href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              Spotify
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="https://soundcloud.com/user-484939163" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              SoundCloud
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="https://music.apple.com/us/artist/trvp-lvne/1473470814" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              Apple Music
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/trvplvne/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              Instagram
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="https://www.tiktok.com/@thenvmeislvne" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              TikTok
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
            <motion.a 
              href="#podcast" 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
            >
              Podcast
              <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
          </motion.div>
          <p className="text-xs tracking-wider text-zinc-600 font-mono">
            &copy; {new Date().getFullYear()} TRVP LVNE.
          </p>
        </div>
      </motion.footer>
    </main>
  );
}
