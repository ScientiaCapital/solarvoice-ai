'use client';

import { Settings, Link, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Settings,
    title: 'Configure Your Agent',
    description:
      "Customize your AI agent's personality, scripts, and objection handling to match your sales process.",
  },
  {
    number: 2,
    icon: Link,
    title: 'Connect Your Systems',
    description:
      'Integrate with your CRM, calendar, and phone system in minutes with our pre-built connectors.',
  },
  {
    number: 3,
    icon: Phone,
    title: 'Start Conversations',
    description:
      'Your AI agent starts handling inbound and outbound calls, qualifying leads 24/7.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and transform your sales process with AI-powered voice agents
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-auto w-2/3" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {step.number}
                  </div>
                  {/* Pulse Animation on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Icon Container */}
                <div className="mb-6 p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <step.icon className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="space-y-3 px-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 mb-4">
                    <svg
                      className="w-6 h-6 text-blue-300 mx-auto"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-700 text-lg mb-6">
            Ready to transform your sales process?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
