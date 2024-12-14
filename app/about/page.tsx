"use client";

import React, { useEffect, useRef } from "react";
import { Header } from "@/components/header";
import {
  Linkedin,
  Award,
  Building,
  Code,
  Lightbulb,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  detail: string;
  emoji: string;
}

const timelineEvents = [
  {
    title: "The Initial Excitement",
    description:
      "Stephanie receives an exciting offer for an on-campus position, looking forward to new opportunities.",
    icon: Lightbulb,
    color: "blue",
    detail:
      "The journey begins with a promising opportunity, filled with excitement and anticipation for what lies ahead.",
    emoji: "👩‍💼",
  },
  {
    title: "The Documentation Challenge",
    description:
      "Faced with 10 different onboarding documents, each requiring the same information to be filled repeatedly.",
    icon: FileSpreadsheet,
    color: "amber",
    detail:
      "Reality sets in as the tedious task of filling multiple forms becomes apparent, each requiring identical information.",
    emoji: "📝",
  },
  {
    title: "The Setback",
    description:
      "After missing a few fields, HR requests all forms to be redone, highlighting the error-prone nature of manual form filling.",
    icon: AlertCircle,
    color: "red",
    detail:
      "A simple oversight leads to frustration as forms need to be redone, valuable time is lost in the process.",
    emoji: "⚠️",
  },
  {
    title: "The Realization",
    description:
      "This frustrating experience sparks the idea that there must be a better way to handle repetitive paperwork.",
    icon: Lightbulb,
    color: "purple",
    detail:
      "From challenge comes inspiration - the seed of an idea that would transform document handling is planted.",
    emoji: "💡",
  },
  {
    title: "ZapFill is Born",
    description:
      "Creation of ZapFill with a mission to simplify repetitive tasks, save time, and reduce errors through intelligent automation.",
    icon: CheckCircle,
    color: "green",
    detail:
      "The solution takes shape as ZapFill emerges, ready to revolutionize how we handle paperwork.",
    emoji: "🚀",
  },
];

const TimelineStep = ({ event }: { event: TimelineEvent }) => {
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className="timeline-step opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="relative flex gap-8 pb-20 group">
        {/* Left side - Timeline */}
        <div className="relative flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute top-12 w-0.5 h-full -z-10 bg-gray-200 timeline-line origin-top scale-y-0 transition-transform duration-1000" />

          {/* Timeline marker */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg border-2 border-${event.color}-500 timeline-dot scale-0 transition-transform duration-500`}
          >
            <event.icon
              className={cn("w-6 h-6", {
                "text-blue-600": event.color === "blue",
                "text-amber-600": event.color === "amber",
                "text-red-600": event.color === "red",
                "text-purple-600": event.color === "purple",
                "text-green-600": event.color === "green",
              })}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 pt-1">
          <div
            className={`bg-white rounded-lg p-8 shadow-lg border-l-4 border-${event.color}-500 timeline-content opacity-0 translate-x-8 transition-all duration-700`}
          >
            <h3 className="text-xl font-bold mb-4">{event.title}</h3>
            <p className="text-gray-600 mb-6">{event.description}</p>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-gray-600 italic mb-4">{event.detail}</p>
              <div className="text-4xl timeline-emoji opacity-0 transition-opacity duration-500 delay-500">
                {event.emoji}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-step.is-visible .timeline-line {
          transform: scaleY(1);
        }
        .timeline-step.is-visible .timeline-dot {
          transform: scale(1);
        }
        .timeline-step.is-visible .timeline-content {
          opacity: 1;
          transform: translateX(0);
        }
        .timeline-step.is-visible .timeline-emoji {
          opacity: 1;
        }
        .timeline-step.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default function AboutUs() {
  const achievements = [
    {
      icon: Award,
      title: "14-time hackathon winner",
      subtitle: "Demonstrated problem-solving skills and innovation",
    },
    {
      icon: Building,
      title: "Incoming Software Engineering Intern at NVIDIA",
      subtitle: "Selected for a highly competitive internship program",
    },
    {
      icon: Code,
      title: "Former Intuit Cybercraft Team Intern",
      subtitle:
        "Gained valuable experience in cybersecurity and software development",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-600">
              From personal frustration to innovation - discover how ZapFill is
              transforming document automation
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-16 text-center">The Journey</h2>

          {/* Timeline */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineStep key={index} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Background */}
      <section id="background" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Stephanie&apos;s Background
          </h2>
          <p className="text-gray-600 mb-10 text-center text-lg">
            Stephanie is a{" "}
            <span className="font-semibold">
              Computer Science student at Columbia University
            </span>
            , bringing a wealth of experience in cybersecurity, AI, and
            full-stack development.
          </p>
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <achievement.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect with Stephanie</h2>
          <p className="text-gray-600 mb-8">
            Want to learn more or collaborate? Connect with Stephanie:
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.linkedin.com/in/steph-tien-ng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
