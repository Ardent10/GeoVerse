import { motion } from "framer-motion";
import { Link } from "react-router";

interface logoProps {
  className?: string;
}

export function Logo({ className }: logoProps) {
  return (
    <Link to="/">
      <motion.img
        src="/assets/logo.png"
        alt="Logo"
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </Link>
  );
}
