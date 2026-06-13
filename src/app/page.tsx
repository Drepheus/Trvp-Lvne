"use client";

import { useState, useEffect } from "react";
import { 
  Music, Gamepad2, Video, Headphones, ArrowRight, 
  Play, Pause, Calendar, Send, Sparkles, ExternalLink, ChevronRight, User, Camera, 
  Tv
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-background text-foreground">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-heading font-black tracking-widest text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600"
        >
          TRVP LVNE
        </motion.div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase text-zinc-400">
          <a href="#tiktok-live" className="hover:text-white transition-colors">TikTok Live</a>
          <a href="#gaming" className="hover:text-white transition-colors">Gaming</a>
          <a href="#music" className="hover:text-white transition-colors">Music</a>
          <a href="#social" className="hover:text-white transition-colors">Social</a>
        </nav>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#music"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_var(--primary)] transition-all"
        >
          Listen Now
        </motion.a>
      </header>

      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold w-max"
            >
              <Sparkles className="w-4 h-4" /> The Central Hub
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
            >
              ENTER THE <br />
              <span className="text-primary hover:text-accent transition-colors duration-500">TRVP LVNE</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 font-light max-w-xl leading-relaxed"
            >
              The official hub for all things Trvp Lvne. Catch the latest TikTok streams, explore the gaming channel, and dive into the discography.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <a href="#tiktok-live" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                TikTok Live <Video className="w-4 h-4 fill-black" />
              </a>
              <a href="#gaming" className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800 hover:scale-105 transition-all flex items-center gap-2">
                Gaming Channel <Gamepad2 className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_60px_rgba(147,51,234,0.15)] group"
            >
              <motion.img 
                src="/images/profile1.jpg" 
                alt="Trvp Lvne profile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-zinc-600">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* 2. TikTok Live Section (White Theme) */}
      <section id="tiktok-live" className="w-full bg-white text-zinc-900 py-32 relative overflow-hidden transition-colors duration-700">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-black font-bold uppercase tracking-widest text-xs mb-6"
            >
              <Video className="w-4 h-4 text-red-600" /> @thenvmeislvne
            </motion.div>
            <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6">
              TIKTOK LIVE EVENTS
            </h2>
            <p className="text-zinc-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Join the official TikTok channel for interactive livestream DJ sets, track giveaways, and community Q&A.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Countdown / Banner */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-zinc-50 rounded-3xl p-8 border border-zinc-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="inline-flex items-center gap-1.5 text-xs text-red-600 font-bold uppercase tracking-wider mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" /> Next Livestream
              </div>
              <h3 className="font-heading text-4xl font-black text-black mb-8">Weekly Session</h3>
              
              <div className="flex gap-4 sm:gap-8 mb-10">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((t, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-black rounded-2xl flex items-center justify-center font-heading font-black text-3xl sm:text-4xl shadow-lg border border-zinc-100">
                      {String(t.val).padStart(2, "0")}
                    </div>
                    <span className="text-xs text-zinc-500 font-bold uppercase mt-3 tracking-widest">{t.label}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://www.tiktok.com/@thenvmeislvne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-zinc-800 hover:scale-105 transition-all text-lg shadow-xl"
              >
                Go To Channel <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Banner Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 h-[400px] rounded-3xl overflow-hidden shadow-2xl relative group"
            >
              <img 
                src="/images/universal.png" 
                alt="TikTok Banner" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                <Video className="w-16 h-16 mb-4 text-white drop-shadow-lg" />
                <h4 className="font-heading text-3xl font-black mb-2">@thenvmeislvne</h4>
                <p className="font-semibold text-white/80">Follow for Live Notifications</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TikTok Gaming Channel Section (Opposite Color / Dark) */}
      <section id="gaming" className="w-full bg-black text-white py-32 relative overflow-hidden border-t-8 border-primary">
        <div className="absolute inset-0 bg-[url('/images/bvit.png')] bg-cover bg-center opacity-10 blur-sm mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-widest text-xs mb-6 border border-primary/50"
            >
              <Gamepad2 className="w-4 h-4" /> @trvppicusonallgames
            </motion.div>
            <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent">
              GAMING CHANNEL
            </h2>
            <p className="text-zinc-300 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Watch gameplay highlights, edits, and live playthroughs covering the latest releases and competitive matches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.a
              href="https://www.tiktok.com/@trvppicusonallgames"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.02 }}
              className="block glass-panel p-1 rounded-3xl bg-gradient-to-br from-primary/40 to-black overflow-hidden group border border-primary/20"
            >
              <div className="bg-black/80 rounded-[22px] p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                    <Gamepad2 className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading text-3xl font-black mb-4">Latest Gaming Clips</h3>
                  <p className="text-zinc-400 leading-relaxed mb-8">
                    Dive into the action. I post daily gaming highlights, funny moments, and intense plays straight from the stream.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm tracking-wider">
                  Watch on TikTok <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@trvppicusonallgames"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.02 }}
              className="block glass-panel p-1 rounded-3xl bg-gradient-to-br from-accent/40 to-black overflow-hidden group border border-accent/20"
            >
              <div className="bg-black/80 rounded-[22px] p-8 h-full flex flex-col justify-between relative overflow-hidden">
                <img 
                  src="/images/profile2.jpg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-luminosity" 
                  alt="Gaming Background" 
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                    <Tv className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading text-3xl font-black mb-4 text-white">Live Playthroughs</h3>
                  <p className="text-zinc-300 leading-relaxed mb-8 font-medium drop-shadow-md">
                    Catch me live gaming. Competitive matches, story mode grinds, and hanging out with the community.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase text-sm tracking-wider relative z-10 bg-black/50 w-max px-4 py-2 rounded-full backdrop-blur-md">
                  Join The Stream <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 4. Music Section */}
      <SectionWrapper id="music" className="relative z-10 py-32 bg-zinc-950">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest text-xs mb-6"
          >
            <Music className="w-4 h-4" /> Discography
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            OFFICIAL MUSIC
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Explore the latest drops, stream the albums, and find Trvp Lvne on your favorite music platform.
          </p>
          
          {/* Main Music Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#1DB954] text-black font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" className="h-5 object-contain opacity-80" /> Listen on Spotify
            </a>
            <a href="https://music.apple.com/us/artist/trvp-lvne/1473470814" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#FA243C] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <Music className="w-5 h-5" /> Apple Music
            </a>
            <a href="https://soundcloud.com/user-484939163" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#FF5500] text-white font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <Headphones className="w-5 h-5" /> SoundCloud
            </a>
          </div>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20 max-w-7xl mx-auto px-6">
          {TRACKS.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel p-4 rounded-3xl group relative overflow-hidden border border-white/5 hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <h4 className="font-heading font-black text-xl text-white mb-1">{track.title}</h4>
                <p className="text-xs text-primary font-semibold mb-4">{track.album}</p>
              </div>
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img 
                  src={track.coverUrl} 
                  alt={track.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-1 text-center">
                <h3 className="font-heading font-bold text-white text-lg">{track.title}</h3>
                <p className="text-sm text-zinc-500">{track.album}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spotify Official Embed */}
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-6">
          <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 glow-purple">
            <iframe 
              src="https://open.spotify.com/embed/album/5Pueca7xcihzG7c2o1pXTj?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              allowFullScreen={false} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="border-0 bg-transparent"
            ></iframe>
          </div>
        </div>
      </SectionWrapper>

      {/* 5. Social & About (Rest of his stuff) */}
      <SectionWrapper id="social" className="relative z-10 py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Active Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.a
              href="https://www.instagram.com/trvplvne/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-pink-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Camera className="w-12 h-12 text-white group-hover:text-pink-500 transition-colors relative z-10" />
              <div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Instagram</h3>
                <p className="text-zinc-400 text-sm">@trvplvne</p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@thenvmeislvne"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-white/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Video className="w-12 h-12 text-white transition-transform group-hover:scale-110 relative z-10" />
              <div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">TikTok</h3>
                <p className="text-zinc-400 text-sm">Main Channel</p>
              </div>
            </motion.a>

            <motion.a
              href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-[#1DB954]/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Music className="w-12 h-12 text-white group-hover:text-[#1DB954] transition-colors relative z-10" />
              <div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Spotify</h3>
                <p className="text-zinc-400 text-sm">Stream Albums</p>
              </div>
            </motion.a>
            
            <motion.a
              href="https://music.apple.com/us/artist/trvp-lvne/1473470814"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:border-[#FA243C]/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FA243C]/20 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ExternalLink className="w-12 h-12 text-white group-hover:text-[#FA243C] transition-colors relative z-10" />
              <div className="relative z-10">
                <h3 className="font-heading font-black text-2xl text-white">Apple Music</h3>
                <p className="text-zinc-400 text-sm">Listen Now</p>
              </div>
            </motion.a>
          </div>

          {/* Biography Text */}
          <div className="flex flex-col gap-6 text-left">
            <h2 className="font-heading text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
              THE ARTIST
            </h2>
            <p className="text-zinc-400 font-light text-xl leading-relaxed">
              TRVP LVNE is an underground artist carving a distinct path through raw storytelling, emotional synth landscapes, and heavy bass lines. Merging dark trap, cloud rap, and digital aesthetics, his music is built for late-night drives, intense gaming sessions, and reflective listeners.
            </p>
            <p className="text-zinc-400 font-light text-xl leading-relaxed">
              Active across both music streaming platforms and interactive live sessions, Trvp Lvne has built an organic community of followers who tune into his regular live events and gaming sessions.
            </p>
            <div className="mt-8 relative w-full h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 glow-pink">
               <img 
                src="/images/profile2.jpg" 
                alt="Trvp Lvne profile setup" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-750 object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-heading font-black text-2xl tracking-wider uppercase">TRVP LVNE</p>
                <p className="text-sm text-accent font-semibold tracking-wider">Independent Artist & Creator</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="w-full py-16 text-center text-zinc-500 text-sm border-t border-white/5 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-heading font-black text-2xl tracking-widest text-white mb-2">TRVP LVNE</h3>
            <p className="text-xs text-zinc-500">Central Hub & Community Portal</p>
          </div>
          <div className="flex gap-6 text-zinc-400">
            <a href="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Spotify</a>
            <a href="https://soundcloud.com/user-484939163" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SoundCloud</a>
            <a href="https://music.apple.com/us/artist/trvp-lvne/1473470814" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Apple Music</a>
            <a href="https://www.instagram.com/trvplvne/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@thenvmeislvne" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a>
          </div>
          <p className="text-xs tracking-wider text-zinc-600 font-mono">
            &copy; {new Date().getFullYear()} TRVP LVNE.
          </p>
        </div>
      </footer>
    </main>
  );
}
