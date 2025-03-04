import { motion } from "framer-motion";

export function SparklesCore({ className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_80%)] ${className}`}
      {...props}
    />
  );
}
