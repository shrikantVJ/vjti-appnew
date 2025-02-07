'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import mark from "@/assets/mark.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Sparkles, ArrowUpRight, CheckCircle } from "lucide-react";
import { Footer } from "@/components/ui/footer";

const features = [
  { title: "AI Task Management", description: "Intelligent task breakdown and organization" },
  { title: "Focus Mode", description: "Enhanced productivity with smart focus tracking" },
  { title: "Team Collaboration", description: "Real-time messaging and video calls" },
  { title: "Document Editor", description: "Advanced document editing with AI assistance" },
  { title: "AR/VR Workspace", description: "Immersive virtual workspace experience" },
  { title: "Work Tools Integration", description: "Seamless integration with popular work tools" },
];

const testimonials = [
  { name: "John Doe", role: "CEO", company: "TechCorp", text: "Revolutionized our workflow" },
  { name: "Sarah Smith", role: "Manager", company: "InnovateCo", text: "Boosted team productivity" },
];

export default function Page() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white" ref={targetRef}>
      <header className="px-4 md:px-20 flex justify-between items-center py-6 fixed top-0 w-full backdrop-blur-xl bg-white/60 z-50 border-b border-gray-100">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold"
        >
          Blue<span className="text-blue-700">Circle</span>
          <span className="relative">
            <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-2 -right-4" />
          </span>
        </motion.h1>
        <nav className="hidden md:flex space-x-8">
          {["Features", "Testimonials", "Pricing"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={`#${item.toLowerCase()}`}
                className="relative hover:text-blue-600 transition-colors group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="space-x-4">
          <Link href="/login">
            <Button 
              variant="ghost" 
              className="hover:bg-blue-50 transition-all duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 group"
            >
              Get Started
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section with 3D effect */}
      <section className="relative pt-32 pb-20 px-4 md:px-20 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Run Organization
              <br />
              Effortlessly with AI
            </h1>
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
          </motion.div>
          
          {/* ... Rest of the sections with enhanced animations and styling ... */}
        </motion.div>
      </section>

      {/* Enhanced Features Grid with hover effects */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-white rounded-2xl hover:bg-blue-50/50 transition-all duration-300
                          border border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-blue-200/20"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-blue-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Active Users" },
              { number: "50M+", label: "Tasks Completed" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-blue-600">{stat.number}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Cards */}
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 -skew-y-6" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Loved by Teams Worldwide
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300
                         border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Transform Your Workspace</h2>
              <p className="text-gray-600">Experience the future of work with our cutting-edge features designed to boost productivity and collaboration.</p>
              <div className="space-y-4">
                {[
                  "AI-powered task management",
                  "Real-time collaboration",
                  "Advanced analytics",
                  "Seamless integrations"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                <div className="bg-white rounded-xl h-full w-full" />
              </div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-2xl transform rotate-6 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Ready to Transform Your Workplace?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of teams already using BlueCircle to improve their productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-blue-600 bg-white hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
