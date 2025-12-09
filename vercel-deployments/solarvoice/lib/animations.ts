/**
 * Framer Motion animation presets for SolarVoice
 * Provides consistent animations across the application
 */

import { Variants, Transition } from "framer-motion";

// ============================================
// BASE TRANSITIONS
// ============================================

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const easeTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3,
};

export const smoothTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.5,
};

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: { opacity: 0, scale: 0.8 },
};

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: { opacity: 0, scale: 0 },
};

// ============================================
// STAGGER CONTAINER
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInFromLeft: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export const slideInFromRight: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

export const slideInFromTop: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

export const slideInFromBottom: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverScale = {
  scale: 1.02,
  transition: easeTransition,
};

export const hoverScaleLarge = {
  scale: 1.05,
  transition: easeTransition,
};

export const hoverLift = {
  y: -4,
  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
  transition: easeTransition,
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
  transition: easeTransition,
};

// ============================================
// TAP ANIMATIONS
// ============================================

export const tapScale = {
  scale: 0.98,
};

export const tapScaleSmall = {
  scale: 0.95,
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  initial: {
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    transition: smoothTransition,
  },
};

export const cardEntry: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition,
  },
};

// ============================================
// LIST ITEM ANIMATIONS
// ============================================

export const listItem: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export const listItemFromRight: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a staggered animation delay for children
 * @param index - Index of the child element
 * @param baseDelay - Base delay in seconds (default: 0.1)
 * @returns Transition object with calculated delay
 */
export const staggerDelay = (index: number, baseDelay = 0.1): Transition => ({
  delay: index * baseDelay,
  ...smoothTransition,
});

/**
 * Creates viewport-triggered animation props
 * @param once - Whether animation should only trigger once (default: true)
 * @param amount - Amount of element visible before triggering (default: 0.2)
 */
export const viewportAnimation = (once = true, amount = 0.2) => ({
  initial: "initial",
  whileInView: "animate",
  viewport: { once, amount },
});

/**
 * Creates hover animation props
 */
export const hoverAnimation = {
  whileHover: "hover",
  whileTap: "tap",
};
