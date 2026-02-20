"use client";

import { motion } from "framer-motion";
import { Camera, Mic, Shield } from "lucide-react";

export function AnimatedCamera({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Camera className="w-full h-full text-white" />
      </motion.div>
      {/* Flash effect */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full opacity-0"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        style={{ top: "25%", right: "25%" }}
      />
    </div>
  );
}

export function AnimatedMic({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Mic className="w-full h-full text-white z-10" />
      {/* Sound waves */}
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-white rounded-full opacity-0"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedShield({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <Shield className="w-full h-full text-white" />
      {/* Shine effect */}
      <motion.div
        className="absolute top-0 bottom-0 bg-white opacity-30 w-2"
        style={{ skewX: -20 }}
        initial={{ left: "-100%" }}
        animate={{ left: "200%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />
    </div>
  );
}
