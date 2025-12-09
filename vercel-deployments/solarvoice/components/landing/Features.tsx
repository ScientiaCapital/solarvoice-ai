"use client";

import { motion } from "framer-motion";
import { Bot, Calendar, Target, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: "ai-agents",
    title: "24/7 AI Agents",
    description:
      "AI agents that handle customer calls around the clock, qualifying leads and scheduling appointments while you sleep.",
    icon: Bot,
    benefits: [
      "Never miss a lead, even outside business hours",
      "Consistent quality in every customer interaction",
      "Scales effortlessly during peak seasons",
      "Reduces operational costs by up to 70%",
    ],
  },
  {
    id: "smart-scheduling",
    title: "Smart Scheduling",
    description:
      "Automated appointment booking that syncs with your calendar and sends reminders to homeowners.",
    icon: Calendar,
    benefits: [
      "Eliminates back-and-forth scheduling emails",
      "Automatic SMS and email reminders reduce no-shows",
      "Real-time calendar sync across your team",
      "Timezone-aware booking for multi-region operations",
    ],
  },
  {
    id: "lead-qualification",
    title: "Lead Qualification",
    description:
      "Intelligent screening that identifies high-value solar prospects based on roof type, energy usage, and buying intent.",
    icon: Target,
    benefits: [
      "Focus your team on qualified, ready-to-buy leads",
      "AI analyzes property data and homeowner signals",
      "Custom qualification criteria for your business",
      "Increases close rates by up to 3x",
    ],
  },
  {
    id: "analytics",
    title: "Analytics Dashboard",
    description:
      "Real-time insights into call performance, conversion rates, and agent effectiveness.",
    icon: BarChart3,
    benefits: [
      "Track ROI and cost-per-acquisition in real-time",
      "Identify top-performing campaigns and channels",
      "Monitor agent performance and call quality",
      "Export reports for stakeholder presentations",
    ],
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to scale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for solar installation
            companies ready to grow their business.
          </p>
        </motion.div>

        <Tabs defaultValue="ai-agents" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-white shadow-md h-auto p-2 rounded-xl">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {feature.title}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsContent key={feature.id} value={feature.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                    {/* Left Column - Feature Details */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {feature.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {benefit}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Visual */}
                    <div className="flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center"
                      >
                        <Icon className="w-32 h-32 text-blue-500 opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-2xl" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg mb-6">
            Ready to see how SolarVoice AI can transform your business?
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Schedule a Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
