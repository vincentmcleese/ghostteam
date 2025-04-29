"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Testimonial {
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          From our clients
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm font-medium">{metric.label}</p>
                      <p className="text-xs text-gray-500">{metric.sublabel}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="text-lg italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
