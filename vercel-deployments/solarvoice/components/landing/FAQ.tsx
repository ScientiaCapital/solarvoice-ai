'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How does the AI voice agent work?',
    answer:
      "Our AI agents use advanced language models to have natural conversations with your customers. They're trained on solar industry knowledge and your specific scripts to handle inquiries, qualify leads, and schedule appointments.",
  },
  {
    question: 'Can the AI handle objections?',
    answer:
      'Yes! Our agents are trained on common objections like cost concerns, roof suitability, and timing. You can customize the objection handling scripts to match your proven sales techniques.',
  },
  {
    question: 'What integrations are available?',
    answer:
      'We integrate with popular CRMs (Salesforce, HubSpot), calendars (Google, Outlook), and phone systems. Our API allows custom integrations with your existing tools.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees. You can start with our free tier to test the platform. Paid plans include dedicated support and onboarding assistance.',
  },
  {
    question: 'How accurate is the AI?',
    answer:
      'Our AI achieves 95%+ accuracy in understanding customer intent. All calls are monitored and agents continuously improve from interactions.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about SolarVoice AI
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-gray-200 hover:border-blue-300 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left py-6 px-4 hover:no-underline hover:bg-blue-50/50 rounded-t-lg transition-colors duration-300">
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-6">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Our team is here to help you get started with AI-powered voice agents.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
