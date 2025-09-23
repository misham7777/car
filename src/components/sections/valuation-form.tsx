"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CarValuationForm } from "@/components/forms/car-valuation-form";

export function ValuationFormSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="valuation-form" className="section-spacing bg-carbon">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container content-center"
      >
        <motion.div variants={itemVariants}>
          <CarValuationForm />
        </motion.div>
      </motion.div>
    </section>
  );
}



