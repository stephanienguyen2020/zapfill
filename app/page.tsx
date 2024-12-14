"use client";

import React from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Upload,
  CheckCircle,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function LandingPage() {
  const [activeDemo, setActiveDemo] = React.useState(0);
  const typewriterText = useTypewriter(
    ["Simple", "Easy", "Fast"],
    150,
    75,
    1000
  );

  const demoSteps = [
    {
      title: "Upload Any Document",
      description:
        "Drag and drop or select any form - PDF, Word, or scanned image",
      icon: Upload,
    },
    {
      title: "AI Detection",
      description: "Watch as our AI instantly identifies all form fields",
      icon: Zap,
    },
    {
      title: "Smart Auto-Fill",
      description: "Forms are filled automatically with stored information",
      icon: FileText,
    },
    {
      title: "Quick Review",
      description: "Verify and submit with confidence",
      icon: CheckCircle,
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-blue-600 mb-4">
            New: AI-Powered Field Detection
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered Document Automation
            <br />
            <span className="text-blue-600">
              Made{" "}
              <span className="inline-block min-w-[5ch]">{typewriterText}</span>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload once, auto-fill forever. ZapFill uses advanced AI to
            automatically detect and fill forms, saving you hours of repetitive
            work.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signup">
              <Button size="lg" className="flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <section className="mt-32 sm:mt-56">
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">See How It Works</h2>
                {demoSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all cursor-pointer ${
                      activeDemo === index
                        ? "bg-blue-50 border-l-4 border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveDemo(index)}
                  >
                    <div className="flex items-center gap-4">
                      {React.createElement(step.icon, {
                        className: `w-6 h-6 ${
                          activeDemo === index
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`,
                      })}
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 rounded-xl p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {React.createElement(demoSteps[activeDemo].icon, {
                      className: "w-8 h-8 text-blue-600",
                    })}
                  </div>
                  <p className="text-gray-600">
                    {demoSteps[activeDemo].description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Features Section */}
        <section id="features" className="mt-32 sm:mt-56">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Intelligent Form Filling
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Powered by AI, Built for You
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Smart Field Detection",
                  description:
                    "Our AI automatically identifies form fields and understands context, working with any document format.",
                },
                {
                  icon: CheckCircle,
                  title: "Intelligent Validation",
                  description:
                    "Auto-validates fields and prompts for missing information with smart suggestions.",
                },
                {
                  icon: Shield,
                  title: "Secure Storage",
                  description:
                    "Your data is encrypted and securely stored, accessible only when you need it.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:border-blue-600 transition-all hover:shadow-lg cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-32 sm:mt-56 py-20 bg-blue-600 text-white rounded-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Documents Processed", value: "1M+" },
                { label: "Hours Saved", value: "50k+" },
                { label: "Happy Users", value: "10k+" },
                { label: "Success Rate", value: "99.9%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-32 sm:mt-56">
          {/* Add how it works content here */}
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-32 sm:mt-56">
          {/* Add pricing content here */}
        </div>
      </main>
    </div>
  );
}
