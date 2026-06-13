"use client";

import { Music, Instagram, Gamepad2, Video, Headphones, Flame, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import AnimatedCard from "@/components/AnimatedCard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="font-heading text-6xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-zinc-600">
            TRVP LVNE
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide">
            The Official Hub
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
             <a href="#music" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105">
               Latest Music
             </a>
             <a href="#tiktok" className="px-8 py-4 rounded-full bg-zinc-800 text-foreground font-semibold hover:bg-zinc-700 transition-all hover:scale-105">
               Watch Live
             </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500"
        >
          <ArrowRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* Music Hub Section */}
      <SectionWrapper id="music">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <Headphones className="w-10 h-10 text-primary" />
            Music Hub
          </h2>
          <p className="text-zinc-400 text-lg">Stream the latest tracks across all platforms.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCard
            title="Spotify"
            subtitle="Stream the latest album"
            url="https://open.spotify.com/album/5Pueca7xcihzG7c2o1pXTj"
            icon={<Music className="w-6 h-6" />}
          />
          <AnimatedCard
            title="Apple Music"
            subtitle="Listen on Apple Music"
            url="https://music.apple.com/us/artist/trvp-lvne/1473470814"
            icon={<Music className="w-6 h-6" />}
          />
          <AnimatedCard
            title="SoundCloud"
            subtitle="Underground & Exclusives"
            url="https://soundcloud.com/user-484939163"
            icon={<Music className="w-6 h-6" />}
          />
        </div>
        
        {/* Optional Spotify Embed */}
        <div className="mt-12 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-zinc-800">
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
      </SectionWrapper>

      {/* Socials Section */}
      <SectionWrapper id="socials">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <Flame className="w-10 h-10 text-primary" />
            Socials
          </h2>
          <p className="text-zinc-400 text-lg">Connect and stay updated.</p>
        </div>
        <div className="max-w-md mx-auto">
          <AnimatedCard
            title="Instagram"
            subtitle="@trvplvne"
            url="https://www.instagram.com/trvplvne/"
            icon={<Instagram className="w-6 h-6" />}
            colorClass="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-zinc-800 hover:border-pink-500"
          />
        </div>
      </SectionWrapper>

      {/* TikTok & Gaming Section (White Theme) */}
      <div className="w-full theme-light bg-background text-foreground transition-colors duration-700 py-10 mt-10" id="tiktok">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
              <Video className="w-10 h-10 text-primary" />
              TikTok & Gaming
            </h2>
            <p className="text-zinc-600 text-lg">Catch the live streams and gameplay.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* TikTok Live Card */}
            <motion.a
              href="https://www.tiktok.com/@thenvmeislvne"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="block overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="h-48 bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50 group-hover:opacity-80 transition-opacity" />
                <Video className="w-16 h-16 text-white relative z-10 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-400 font-medium relative z-10">Live Events</span>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-2">TikTok Main Channel</h3>
                <p className="text-zinc-600 mb-6 font-medium">@thenvmeislvne</p>
                <span className="inline-flex items-center text-primary font-bold">
                  Watch Now <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </div>
            </motion.a>

            {/* Gaming Card */}
            <motion.a
              href="https://www.tiktok.com/@trvppicusonallgames"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="block overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="h-48 bg-primary flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-800 opacity-80 group-hover:opacity-100 transition-opacity" />
                <Gamepad2 className="w-16 h-16 text-white relative z-10 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-primary-foreground/80 font-medium relative z-10">Gameplay</span>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-2">Gaming Channel</h3>
                <p className="text-zinc-600 mb-6 font-medium">@trvppicusonallgames</p>
                <span className="inline-flex items-center text-primary font-bold">
                  View Channel <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </div>
            </motion.a>
          </div>
        </SectionWrapper>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 text-center text-zinc-500 text-sm border-t border-zinc-900 bg-zinc-950 mt-auto">
        <p className="font-heading tracking-wider">&copy; {new Date().getFullYear()} TRVP LVNE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
