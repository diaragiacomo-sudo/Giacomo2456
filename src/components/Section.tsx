import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export default function Section({ id, className, children, delay = 0 }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
