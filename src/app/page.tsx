"use client";

import { useState, useEffect } from "react";
import { 
  Music, Gamepad2, Video, Headphones, Flame, ArrowRight, 
  Play, Pause, Volume2, Calendar, Send, Sparkles, ExternalLink, ChevronRight, User
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
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName && bookingEmail) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setBookingName("");
        setBookingEmail("");
        setBookingMsg("");
      }, 3000);
    }
  };

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
          <a href="#music" className="hover:text-white transition-colors">Releases</a>
          <a href="#player" className="hover:text-white transition-colors">Player</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#tiktok" className="hover:text-white transition-colors">TikTok & Gaming</a>
          <a href="#booking" className="hover:text-white transition-colors">Booking</a>
        </nav>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#booking"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_var(--primary)] transition-all"
        >
          Collab / Book
        </motion.a>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold w-max"
            >
              <Sparkles className="w-4 h-4" /> Live Central Hub
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
              Experience the sonic depth of underground hip-hop. Stream the latest releases, follow the gaming channel, and catch the live events.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <a href="#music" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                Listen Now <Play className="w-4 h-4 fill-black" />
              </a>
              <a href="#tiktok" className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800 hover:scale-105 transition-all flex items-center gap-2">
                TikTok Live <Video className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
          {/* Floating graphic */}
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

      {/* Upgraded Discography Grid */}
      <SectionWrapper id="music" className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            LATEST RELEASES
          </h2>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto">Explore his latest drops, artwork, and full-length albums.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TRACKS.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel p-4 rounded-3xl group relative cursor-pointer overflow-hidden border border-white/5 hover:border-primary/30 transition-all flex flex-col justify-between"
              onClick={() => {
                setActiveTrack(track);
                setIsPlaying(true);
                setProgress(0);
                const el = document.getElementById("player");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <h4 className="font-heading font-black text-xl text-white mb-1">{track.title}</h4>
                <p className="text-xs text-primary font-semibold mb-4">{track.album}</p>
                <div className="flex gap-3 text-white">
                  <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:bg-primary transition-colors">
                    <Music className="w-4 h-4" />
                  </a>
                  <a href={track.soundcloudUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:bg-primary transition-colors">
                    <Headphones className="w-4 h-4" />
                  </a>
                  <a href={track.appleUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:bg-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Artwork */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img 
                  src={track.coverUrl} 
                  alt={track.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex justify-between items-center px-1">
                <div>
                  <h3 className="font-heading font-bold text-white group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-xs text-zinc-500">{track.album}</p>
                </div>
                <div className="p-3 bg-zinc-900/55 rounded-full hover:bg-primary text-white transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Upgraded Music Player & Biography */}
      <SectionWrapper id="player" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Custom audio player mockup */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 glow-purple shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Now Streaming</span>
              </div>

              <div className="w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl mb-6 border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeTrack.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={activeTrack.coverUrl} 
                    alt={activeTrack.title} 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl font-black text-white">{activeTrack.title}</h3>
                <p className="text-sm text-primary font-medium">{activeTrack.album}</p>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                  <span>0:45</span>
                  <span>{activeTrack.duration}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex justify-center items-center gap-6 text-white mb-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-5 bg-white text-black hover:bg-primary hover:text-white transition-all rounded-full hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
              </div>

              {/* Streaming Links */}
              <div className="flex justify-around items-center pt-6 border-t border-white/5 text-zinc-400">
                <a href={activeTrack.spotifyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <Music className="w-4 h-4" /> Spotify
                </a>
                <a href={activeTrack.soundcloudUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <Headphones className="w-4 h-4" /> Soundcloud
                </a>
                <a href={activeTrack.appleUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <ExternalLink className="w-4 h-4" /> Apple
                </a>
              </div>
            </div>
          </div>

          {/* Spotify Official Embed */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-heading text-3xl font-black text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" /> Playlist & Audio Widget
            </h3>
            <p className="text-zinc-400 font-light">
              Toggle tracks in the card showcase on the left to simulate custom streaming, or access Trvp Lvne's full library widget below to listen to full-length tracks directly.
            </p>
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
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
        </div>
      </SectionWrapper>

      {/* Upgraded Biography Section */}
      <SectionWrapper id="about" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Biography text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-white">
              ABOUT TRVP LVNE
            </h2>
            <p className="text-zinc-400 font-light text-lg leading-relaxed">
              TRVP LVNE is an underground artist carving a distinct path through raw storytelling, emotional synth landscapes, and heavy bass lines. Merging dark trap, cloud rap, and digital aesthetics, his music is built for late-night drives, intense gaming sessions, and reflective listeners.
            </p>
            <p className="text-zinc-400 font-light text-lg leading-relaxed">
              Active across both music streaming platforms and interactive live sessions, Trvp Lvne has built an organic community of followers who tune into his regular live events and gaming sessions. This site is the central landing point connecting all corners of his creative universe.
            </p>
            <div className="flex gap-8 mt-4">
              <div className="flex flex-col">
                <span className="font-heading text-4xl font-black text-primary">5+</span>
                <span className="text-zinc-500 text-sm">Official Drops</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-4xl font-black text-accent">10K+</span>
                <span className="text-zinc-500 text-sm">Monthly Streams</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-4xl font-black text-white">100%</span>
                <span className="text-zinc-500 text-sm">Independent</span>
              </div>
            </div>
          </div>
          {/* Biography Picture Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 glow-pink">
              <img 
                src="/images/profile2.jpg" 
                alt="Trvp Lvne profile setup" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-heading font-black text-xl tracking-wider uppercase">TRVP LVNE</p>
                <p className="text-xs text-accent font-semibold tracking-wider">Independent Artist & Creator</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Upgraded TikTok & Gaming Section (White Theme Contrast) */}
      <div className="w-full theme-light bg-background text-foreground transition-colors duration-700 py-24" id="tiktok">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold w-max mb-4"
            >
              <Calendar className="w-4 h-4" /> Live Events Scheduling
            </motion.div>
            <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900">
              TIKTOK & GAMING HUB
            </h2>
            <p className="text-zinc-600 text-lg max-w-xl mx-auto font-light">
              Catch active TikTok live streams, exclusive events, and watch latest highlights from the gaming channel.
            </p>
          </div>

          {/* Countdown Ticket component */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl border border-zinc-200 bg-white/70 shadow-xl max-w-4xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> Next TikTok Live Stream
              </div>
              <h3 className="font-heading text-2xl font-black text-zinc-900 mb-1">Weekly Live Session & DJ Set</h3>
              <p className="text-zinc-500 text-sm">Interactive set, track previews, and community Q&A.</p>
            </div>
            
            {/* Live Timer Countdown */}
            <div className="flex gap-4">
              {[
                { label: "D", val: timeLeft.days },
                { label: "H", val: timeLeft.hours },
                { label: "M", val: timeLeft.minutes },
                { label: "S", val: timeLeft.seconds },
              ].map((t, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-heading font-black text-2xl shadow-lg">
                    {String(t.val).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1.5">{t.label}</span>
                </div>
              ))}
            </div>

            <a 
              href="https://www.tiktok.com/@thenvmeislvne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-zinc-900 text-white font-bold hover:bg-zinc-800 flex items-center gap-2 hover:scale-105 transition-all text-sm"
            >
              Set Reminder <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* TikTok Main Live card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-zinc-200 bg-white/70 overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="h-56 bg-zinc-950 flex flex-col justify-end p-6 relative overflow-hidden group">
                {/* Background image mockup for TikTok */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 opacity-90" />
                <img 
                  src="/images/universal.png" 
                  alt="TikTok Live bg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Live
                </div>
                <Video className="w-14 h-14 text-white relative z-10 mb-4" />
                <h4 className="font-heading text-2xl font-black text-white relative z-10">TikTok Live Events</h4>
                <p className="text-zinc-400 text-sm relative z-10">@thenvmeislvne</p>
              </div>
              <div className="p-8">
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Join the official TikTok channel to catch interactive livestream DJ sets, gaming tournaments, and track giveaways.
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="https://www.tiktok.com/@thenvmeislvne" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    Go Live Channel <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs font-semibold text-zinc-400">Regular streams weekly</span>
                </div>
              </div>
            </motion.div>

            {/* Gaming channel card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-zinc-200 bg-white/70 overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="h-56 bg-primary flex flex-col justify-end p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-800 opacity-90" />
                <img 
                  src="/images/bvit.png" 
                  alt="Gaming bg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider">
                  Active Gaming
                </div>
                <Gamepad2 className="w-14 h-14 text-white relative z-10 mb-4" />
                <h4 className="font-heading text-2xl font-black text-white relative z-10">Gaming Clips & Stream</h4>
                <p className="text-purple-200 text-sm relative z-10">@trvppicusonallgames</p>
              </div>
              <div className="p-8">
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Watch gameplay highlights, edits, and live playthroughs covering the latest releases and competitive matches.
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="https://www.tiktok.com/@trvppicusonallgames" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    Visit Channel <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs font-semibold text-zinc-400">TikTok Gaming Clips</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking / Contact Section */}
      <SectionWrapper id="booking" className="relative z-10 border-t border-white/5 bg-zinc-950/25 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              GET IN TOUCH
            </h2>
            <p className="text-zinc-400 text-lg">For bookings, sponsorships, collaborations or inquiries.</p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 glow-purple">
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Your Name</label>
                  <input 
                    type="text" 
                    value={bookingName} 
                    onChange={e => setBookingName(e.target.value)} 
                    placeholder="Enter name"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3.5 px-4 outline-none focus:border-primary transition-colors text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Your Email</label>
                  <input 
                    type="email" 
                    value={bookingEmail} 
                    onChange={e => setBookingEmail(e.target.value)} 
                    placeholder="Enter email"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3.5 px-4 outline-none focus:border-primary transition-colors text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Your Message</label>
                <textarea 
                  value={bookingMsg} 
                  onChange={e => setBookingMsg(e.target.value)} 
                  placeholder="Write message details..."
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3.5 px-4 outline-none focus:border-primary transition-colors text-sm resize-none"
                  required
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-primary font-bold text-sm"
                    >
                      Message Sent Successfully!
                    </motion.p>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_20px_var(--primary)] transition-all ml-auto flex items-center gap-2 text-sm"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
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
            &copy; {new Date().getFullYear()} TRVP LVNE. 독립 제작.
          </p>
        </div>
      </footer>
    </main>
  );
}
