"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

interface AnimatedCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  url: string;
  colorClass?: string;
}

export default function AnimatedCard({
  title,
  subtitle,
  icon,
  url,
  colorClass = "bg-zinc-900 border-zinc-800 hover:border-primary",
}: AnimatedCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`block p-6 rounded-2xl border transition-colors duration-300 ${colorClass} group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="p-3 bg-black/20 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-heading font-bold text-xl text-foreground">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </motion.a>
  );
}
